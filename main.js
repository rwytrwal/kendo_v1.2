$(function getdata(){
    var dataSource2 = new kendo.data.DataSource({
        transport: {
            read: {
                url: config.url1,

            }
        },
        schema: {
            errors: function (response) {
                return response.error; // twitter's response is { "error": "Invalid query" }
            }
        },
        error: function(e) {
            $('#error').html('<h1 style="color: red">Server Offline :(</h1>'); // displays "Invalid query"
        }
    });
    // $("#name").kendoAutoComplete({
    //     dataTextField: "name",
    //     dataSource: dataSource2,
    //     filter:"startswith",
    //     placeholder: "Wpisz imię ....",
    //     separator: ", ",
    //     select: function (e) {
    //         var dataItem = this.dataItem(e.item.index());
    //         grid(dataItem);
    //     }
   // });
    grid();
});

 function grid (a) {
    $("#grid").kendoGrid({
        toolbar: [
            { name: "create" }
        ],
        dataSource: {
            transport: {
                read: config.url2
            },
            //filter: {field: "userId", operator: "eq", value: a.id},
        },
        columns: [
            {field: "userId", title: "<b><p align='center'>Userid</p></b>", width: "100px"},
            {field: "id", title: "<b><p align='center'>User</p></b>", width: "100px"},
            {field: "title", title: "<b><p align='center'>Title</p></b>"},
            {field: "body", title: "<b><p align='center'>Body</p></b>"},
        ],

        schema: {
            model:{ userId: "userId" }
        },
        //editable: true,
        detailInit: detailInit
    });
}
function detailInit(e) {
    $("#grid2").kendoGrid({
        dataSource: {
            transport: {
                read: config.url3
            },
            filter: {field: "postId", operator: "eq", value: e.data.id}
        },
        scrollable: true,
        columns: [
            {field: "name", title: "<b><p align='center'>Name</p></b>"},
            {field: "body", title: "<b><p align='center'>Comment</p></b>"}
        ]
    });
}