##Alternate Grouping Method


def filter_by_group_array(sheet1_df, sheet2_df, chosen_filter):
    # Filter nodes by group
    filtered_sheet1_df = sheet1_df[sheet1_df['groups'].apply(lambda x: chosen_filter in x)]
    
    # Get the ids of the filtered nodes
    filtered_node_ids = filtered_sheet1_df['ID'].tolist()
    
    # Filter relationships where at least one node is in the filtered group
    filtered_sheet2_df = sheet2_df[
        (sheet2_df['from'].isin(filtered_node_ids)) | 
        (sheet2_df['to'].isin(filtered_node_ids))
    ]
    
    return filtered_sheet1_df, filtered_sheet2_df

def fix_naming_array(sheet1_df):
    sheet1_df.columns.values[0] = 'ID'
    sheet1_df.columns.values[1] = 'name'
    sheet1_df.columns.values[2] = 'label'
    sheet1_df.columns.values[3] = 'value'
    
    # Create a new 'groups' column by aggregating all remaining columns into a list
    sheet1_df['groups'] = sheet1_df.iloc[:, 4:].apply(lambda row: row.dropna().tolist(), axis=1)
    
    # Select only the required columns
    fixed_sheet1_df = sheet1_df[['id', 'name', 'label', 'value', 'groups']]
    
    return fixed_sheet1_df

