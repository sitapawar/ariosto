from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
groupnames = []
sheet1_df = pd.DataFrame()  # Global variable to store sheet1 DataFrame
sheet2_df = pd.DataFrame()  # Global variable to store sheet2 DataFrame

@app.route('/')
def home():
    print('running')
    return "connected to backend!"

@app.route("/recieve_data", methods=['POST', 'GET'])
def recieve_data():
    global sheet1_df, groupnames, sheet2_df  # Ensure we're modifying the global variables
    if request.method == "POST":
        data = request.get_json()  # Assuming the data is sent as JSON

        # Extract sheets data from request
        sheet1_data = data.get('sheet1', [])
        sheet2_data = data.get('sheet2', [])

        # Convert to DataFrames
        sheet1_df = pd.DataFrame(sheet1_data[1:], columns=sheet1_data[0])  # Use the first row as columns
        sheet2_df = pd.DataFrame(sheet2_data[1:], columns=sheet2_data[0])  # Use the first row as columns

        # Example processing
        sheet1_df = fix_naming(sheet1_df)
        sheet2_df = fix_edges(sheet1_df, sheet2_df)

        print("Sheet 1 DataFrame:")
        print(sheet1_df.head())
        print("Sheet 2 DataFrame:")
        print(sheet2_df.head())

        sheet2_df = mutual_labels(sheet2_df)

        # Return processed data as JSON
        response = {
            'sheet1': sheet1_df.to_json(orient='records'),
            'sheet2': sheet2_df.to_json(orient='records')
        }
        
        return jsonify(response)

@app.route("/group_names", methods=['GET'])
def get_group_names():
    return jsonify({'groupNames': groupnames})

@app.route("/filters", methods=['POST'])
def get_filters():
    chosen_group_name = request.json.get('groupName')
    chosen_group_number = group_name_map(chosen_group_name)
    filters = list_filters(sheet1_df, chosen_group_number)
    print(filters)
    return jsonify({'filters': filters.tolist()})

@app.route("/filtered_data", methods=['POST'])
def get_filtered_data():
    chosen_group_name = request.json.get('groupName')
    chosen_filter = request.json.get('filter')
    chosen_group_number = group_name_map(chosen_group_name)
    filtered_sheet1_df, filtered_sheet2_df = filter_by_group(sheet1_df, sheet2_df, chosen_filter, chosen_group_number)
    response = {
        'sheet1': filtered_sheet1_df.to_json(orient='records'),
        'sheet2': filtered_sheet2_df.to_json(orient='records')
    }
    return jsonify(response)



def group_name_map(chosen_group_name):
    global groupnames
    print(groupnames)
    print(chosen_group_name)
    if chosen_group_name in groupnames:
        index = groupnames.index(chosen_group_name)
        return f"group{index + 1}"
    else:
        return "Name not found"

def mutual_labels(sheet):
    if 'mutual' in sheet.columns:
        sheet['arrows'] = sheet['mutual'].apply(lambda x: {'to': True, 'from': True} if x else None)
        sheet = sheet.drop(columns=['mutual'])  # Drop the original 'mutual' column
    return sheet

def list_group_names(sheet1_df):
    col_name_list = list(sheet1_df.columns.values)
    return col_name_list[4:]

def list_filters(sheet1_df, chosen_group_number):
    # Check if the column exists
    if chosen_group_number not in sheet1_df.columns:
        raise KeyError(f"Column '{chosen_group_number}' does not exist in DataFrame")
    # Extract the column data
    column_data = sheet1_df[chosen_group_number]
    # Convert boolean values to strings if necessary
    if column_data.dtype == bool:
        column_data = column_data.map({True: 'True', False: 'False'})
    # Drop NA values
    column_data = column_data.dropna()
    # Get unique values
    unique_values = column_data.unique()
    # Ensure "True" comes first    
    return unique_values

def adjust_edge_angles(sheet2_df):
    sheet2_df['pair'] = sheet2_df.apply(lambda row: tuple(sorted([row['to'], row['from']])), axis=1)

    sheet2_df['iteration'] = sheet2_df.groupby('pair').cumcount() + 1

    sheet2_df = sheet2_df.drop(columns='pair')
    sheet2_df['angle'] = sheet2_df['iteration'].map(
    {
        1: -0.4,
        2: -0.2,
        3: 0.0,
        4: 0.2,
        5: 0.4
    }
    )
    #-40, -20, 0, 20, 40
    sheet2_df = sheet2_df.drop(columns='iteration')
    return sheet2_df



def filter_by_group(sheet1_df, sheet2_df, chosen_filter, chosen_group_number):
    filtered_sheet1_df = sheet1_df[sheet1_df[chosen_group_number] == chosen_filter]
    filtered_node_ids = filtered_sheet1_df['ID'].tolist()
    
    filtered_sheet2_df = sheet2_df[
        (sheet2_df['from'].isin(filtered_node_ids)) & 
        (sheet2_df['to'].isin(filtered_node_ids))
    ]
    
    return filtered_sheet1_df, filtered_sheet2_df

def filter_by_edges(sheet1_df, sheet2_df, chosen_edge_type):
    filtered_sheet2_df = sheet2_df[sheet2_df["label"] == chosen_edge_type]
    filtered_to_node_names = filtered_sheet2_df['to'].tolist()
    filtered_from_node_names = filtered_sheet2_df['from'].tolist()
    filtered_node_names = []

    for node in filtered_to_node_names + filtered_from_node_names:
        if node not in filtered_node_names:
            filtered_node_names.append(node)

    
    filtered_sheet1_df = sheet1_df[
        (sheet1_df['Name'].isin(filtered_node_names))
    ]
    
    return filtered_sheet1_df, filtered_sheet2_df

def fix_naming(sheet1_df):
    global groupnames
    sheet = sheet1_df
    sheet.columns.values[0] = 'ID'
    sheet.columns.values[1] = 'Name'
    sheet.columns.values[2] = 'Label'
    sheet.columns.values[3] = 'value'
    group_columns = sheet.columns[4:]
    group_column_names = [col.title() for col in group_columns.tolist()]
    groupnames = group_column_names

    # Rename the other group columns to group1, group2, etc.
    for i, col in enumerate(group_columns, start=1):
        sheet.rename(columns={col: f'group{i}'}, inplace=True)
        
    return sheet

def fix_edges(sheet1_df, sheet2_df):
    sheet2_df.columns.values[0] = 'from'
    sheet2_df.columns.values[1] = 'to'

    # Create a dictionary to map names to ids
    name_to_id = pd.Series(sheet1_df.ID.values, index=sheet1_df.Name).to_dict()
    
    # Function to convert name to id if necessary
    sheet2_df['to'] = sheet2_df['to'].apply(lambda value: name_to_id.get(value, value))
    sheet2_df['from'] = sheet2_df['from'].apply(lambda value: name_to_id.get(value, value))

    ##CALL FIX EDGES
    
    return sheet2_df

if __name__ == '__main__':
    app.run(debug=True)
