export interface schema_model{
    ordinal_position : string;
    column_name : string;
    data_type : string;
}

export interface response_make_crud_model{
    entity : string;
    controller : string;
    service : string;
    dto :string;
    repository :string;
    att :string;
    model :string;
}