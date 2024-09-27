import { StringHelper } from "./string.utils";


interface ParameterSearchModel {
    columnName: string;
    filter: string;
    searchText: string;
    searchText2: string;
    withOr?: boolean;
}

export class Dynamicfilter {
    private static readonly sh = StringHelper;

    static async GetQueryFiltersByParams(param: ParameterSearchModel[], tableName?: string) {

        let filters: string = '';

        param.forEach((item, index) => {
            let text: string = '';

            if (filters != '')
                if (item.withOr != undefined) {
                    filters += item.withOr ? " OR " : " And ";
                }


            // item.searchText = item.searchText.toLowerCase();
            // item.searchText2 = item.searchText2.toLowerCase();
            // console.log(tableName);
            if (typeof tableName != 'undefined') {
                item.columnName = tableName + '.' + item.columnName.toLowerCase();
            } else {
                item.columnName = item.columnName.toLowerCase();
            }
            item.filter = item.filter.toLowerCase();

            // if (item.filter == "equal") {
            //     if (item.searchText2 != '' && !item.searchText2) {
            //         item.columnName = "lower(" + item.columnName + ")";
            //     }
            // }
            // else if (item.filter == "in") {
            //     if ((item.searchText2 !=undefined || item.searchText2 !='')) {
            //         item.columnName = "lower(" + item.columnName + ")";
            //     }
            // }
            // else if (item.filter == "like") {
            //     item.columnName = "lower(" + item.columnName + ")";
            // }


            if (item.filter == "like" || item.filter == "ilike") {
                text += item.columnName + " ilike '%" + item.searchText + "%'";
            }
            //equals integer rules
            else if (item.filter == "equal" && (item.searchText2 == undefined || item.searchText2 == '')) {
                text += item.columnName + ((item.searchText == undefined || item.searchText == '') ? " = '0'" : " = '" + item.searchText + "'");
            }
            //equal string rules
            else if (item.filter == "equal" && (item.searchText2 != undefined || item.searchText2 != '')) {
                text += item.columnName + " = '" + item.searchText2 + "'";
            }
            else if (item.filter == "between") {
                text += item.columnName + " between '" + item.searchText + "' and '" + item.searchText2 + "'";
            }
            //filter multiple param with same fieldName, data example : 1,2,3,4,5 or 'a','b','c','d','e'
            else if (item.filter == "in") {
                if ((item.searchText2 == undefined || item.searchText2 == '')) {
                    let datas: string[] = item.searchText.split(',');

                    if (datas.length > 0) {
                        let paramsData: string = item.searchText; // a,b,c,d => 'a','b','c','d'

                        datas.forEach((data) => {
                            paramsData = paramsData.replace(data, "'" + data + "'");
                        })

                        text += item.columnName + " in (" + paramsData + ")";
                    }
                    else {
                        text += item.columnName + " in ()";
                    }
                    // text += item.columnName + " in (" + item.searchText + ")";
                } else {
                    let datas: string[] = item.searchText2.split(',');

                    if (datas.length > 0) {
                        let paramsData: string = item.searchText2; // a,b,c,d => 'a','b','c','d'

                        datas.forEach((data) => {
                            paramsData = paramsData.replace(data, "'" + data + "'");
                        })

                        text += item.columnName + " in (" + paramsData + ")";
                    }
                    else {
                        text += item.columnName + " in ()";
                    }
                }
            }
            filters += text;
        })
        filters = (filters!='')?'where '+filters : filters;
        return filters;
    }
}