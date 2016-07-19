/**
 * Created by rwytrwal on 7/18/2016.
 */
/**
 * Created by rwytrwal on 7/18/2016.
 */
$(function () {
    dataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://jsonplaceholder.typicode.com/posts"
            }
        }

    });
    $("#grid").kendoGrid({
        dataSource:dataSource
        ,
        columns: [
            //{field: "userId",title:"Human"},
            {field: "id",title:"id"},
            {field: "title",title:"title"},
            {field: "body",title:"body"}

        ]

    });
    $("#countries").kendoAutoComplete({
        dataTextField: "title",
        dataSource: dataSource,
        filter: "startswith",
        placeholder: "Select user",
        separator: ", "
    });
});