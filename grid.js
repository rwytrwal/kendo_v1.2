/**
 * Created by rwytrwal on 7/20/2016.
 */
function getdata() {
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
        error: function (e) {
            $('#error').html('<h1 style="color: red">Server Offline :(</h1>'); // displays "Invalid query"
        }
    });
    var dataSourcePost = new kendo.data.DataSource({
        transport: {
            read: {
                url: config.url2,
            }
        },
        schema: {
            errors: function (response) {
                return response.error; // twitter's response is { "error": "Invalid query" }
            }
        },
        error: function (e) {
            $('#error').html('<h1 style="color: red">Server Offline :(</h1>'); // displays "Invalid query"
        }
    });
    var dataSource3 = new kendo.data.DataSource({
        data: config.posty
    });
    $("#name").kendoAutoComplete({
        dataTextField: "name",
        dataSource: dataSource2,
        filter: "startswith",
        placeholder: "Wpisz imię ....",
        separator: ", ",
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());
            grid(dataItem);
        }
    });
    $("#newBase").click(function () {
        $("#grid").data("kendoGrid").setDataSource(dataSource3);
    });
    $("#oldBase").click(function () {
        $("#grid").data("kendoGrid").setDataSource(dataSourcePost);
    });
    


};

function grid(a) {
    var $grid = $("#grid").kendoGrid({
        dataSource: {
            transport: {
                read: config.url2
            },
            filter: {field: "userId", operator: "eq", value: a.id},
        },
        columns: [
            {field: "userId", title: "<b><p align='center'>Userid</p></b>", width: "100px"},
            {field: "id", title: "<b><p align='center'>User</p></b>", width: "100px"},
            {field: "title", title: "<b><p align='center'>Title</p></b>"},
            {field: "body", title: "<b><p align='center'>Body</p></b>"},
        ],
        detailInit: detailInit
    }).data("kendoGrid");
    $("#after").on("click", function () {
        var inPut = $('#lol').val();
        var uId = a.id;
        $grid.dataSource.insert(0, {userId: uId, id: " ", title: inPut, body: inPut});
        console.log($grid);
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

$("#removeallrow").click(function () {
        $("#grid").data('kendoGrid').dataSource.data([]);
    }
);