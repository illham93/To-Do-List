$(document).ready(function() {
    // Load the saved tasks
    var ids = [];
    $.ajax({
        type: 'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1158',
        dataType: 'json',
        success: function (response, textStatus) {
            var taskArray = response.tasks;
            console.log(taskArray);
            for (i in taskArray) {
                // Store the ids in an array which are hidden in the DOM, so that we can retrieve that id later when a remove button is clicked. I'm sure there's a better way to do this but this is the first thing I could think of
                var id = taskArray[i].id;
                ids.push(id);
                $('tbody').append(
                    '<tr>' +
                        '<td>' +
                            '<div class="form-check">' +
                                '<input class="form-check-input" type="checkbox" value="">' + taskArray[i].content +
                                '<span class="idNumber">' + id + '</span>' +
                                '<button class="btn btn-danger btn-sm remove">X</button>' +
                            '</div>' +
                        '</td>' +
                    '</tr>'
                )
            }
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
     
    // Add a new task
    $('#newTask').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=1158',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                task: {
                    content: $('#taskName').val(),
                }
            }),
            success: function (response, textStatus) {
                $('tbody').append(
                    '<tr>' +
                        '<td>' +
                            '<div class="form-check">' +
                                '<input class="form-check-input" type="checkbox" value="">' + response.task.content +
                                '<span class="idNumber">' + response.task.id + '</span>' +
                                '<button class="btn btn-danger btn-sm remove">X</button>' +
                            '</div>' +
                        '</td>' +
                    '</tr>'
                )
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });

    })   

    // Remove a task
    $(document).on('click', '.remove', function() {
        var id = $(this).siblings('.idNumber').html();
        $.ajax({
            type: 'DELETE',
            url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1158',
            success: function(response, textStatus) {
                console.log(response);
                $('span:contains(' + id + ')').closest('tr').remove();
            },
            error: function (request, textStatus, errorMessage) {
                console.log(errorMessage);
            }
        });

    })

    // Mark a task as completed
    $(document).on('change', '.form-check-input', function() {
        var id = $(this).siblings('.idNumber').html();
        if (this.checked) {
            $.ajax({
                type: 'PUT',
                url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=1158',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({})
            })
        }
    })
})

