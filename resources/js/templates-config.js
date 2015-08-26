var templates = (function () {
    var dataPath = 'resources/templates/',
        sourceParameters = {
            item: {
                name: 'topic-item.html',
                content: ''
            },
            item_content: {
                name: 'topic-content.html',
                content: ''
            },
            list_item: {
                name: 'list-content.html',
                content: ''
            },
            word_content: {
                name: 'word-content.html',
                content: ''
            }
        },
        initialize = {
            readTemplates: function () {
                $.each(sourceParameters, function (index, value) {
                    $.ajax({
                        url: dataPath + value.name,
                        async: false,
                        success: function (json) {
                            value.content = json;
                        }
                    });
                });
            }
        };
    initialize.readTemplates();

    return {
        collections: sourceParameters
    }

})();

