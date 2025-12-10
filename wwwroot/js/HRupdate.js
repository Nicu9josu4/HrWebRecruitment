//$(document).ready(function () {
//    $('.WelcomeToPanel').css('display', 'none');
//    $('.addVacancies').show();
//    //$.cookie('cookie', 'val');
//    var target = 'GetVacancy';
//    var ID = "";
//    var CandidatID = 0;


//    const StatusArray = [];

//    $.ajax({
//        method: "GET",
//        url: "/Admin/GetStatuses",
//        data:
//        {
//            action: "GetComponents",
//        },
//        dataType: 'json',
//        success: function (data) {
//            $(data).each(function (index, num) {

//                StatusArray.push(num);
//            });
//            //StatusArray = JSON.parse(data);
//        },

//    });
//    function GetNextStatus(currentStatus) {




//        var index = StatusArray.indexOf(currentStatus);
//        if (index >= 0 && index < StatusArray.length - 1)
//            return StatusArray[index + 1];
//        else return 'New';


//        //if (currentStatus === StatusArray[StatusArray.length - 1]) {
//        //    return 'New';
//        //}
//        //else {
//        //    const iterator = StatusArray.values();
//        //    for (const status in iterator) {
//        //        if (iterator.next().value === currentStatus)
//        //            return iterator.value;
//        //    }
//        //}
//    }
//    //var a = GetNextStatus('New');
//    //var b = GetNextStatus('Analyzing');

//    function getCookie(cname) {
//        let name = cname + "=";
//        let decodedCookie = decodeURIComponent(document.cookie);
//        let ca = decodedCookie.split(';');
//        for (let i = 0; i < ca.length; i++) {
//            let c = ca[i];
//            while (c.charAt(0) == ' ') {
//                c = c.substring(1);
//            }
//            if (c.indexOf(name) == 0) {
//                return c.substring(name.length, c.length);
//            }
//        }
//        return "";
//    }
//    var role = getCookie("role");
//    if (role === "Admin") {
//        $(".topnav").append('<a id="UsersModal-btn" class="LinkToModal">Users</a>' +
//            '<a id="DictionaryModal-btn" class="LinkToModal">Dictionary</a>');
//        //$('#DictionaryModal-btn').show();
//        //$('#EmployeesModal-btn' ).show();
//        //$('#UsersModal-btn'     ).show();
//    }

//    if (role != null) {
//        $('#LogOutModal-btn').on('mousedown', function () {
//            document.cookie = "role=";
//            document.location.href = "/";
//            //$.removeCookie("role", null, { path: "/" });
//        });
//    }

//    function GetVacancy(data) {

//        var i = 1;
//        var HeadTable = $('.VacanciesTable thead');
//        var BodyTable = $('.VacanciesTable tbody');
//        BodyTable.empty();
//        HeadTable.empty();
//        $('#SelectModel').empty();
//        $('#SelectModel').append('<option selected>Select Model...</option>');
//        HeadTable.append(
//            '<tr><th width="10px">№</th>'
//            + '<th width="80px">Title</th>'
//            + '<th width="300px">Description</th>'
//            + '<th width="50px">StartDate</th>'
//            + '<th width="50px">EndDate</th></tr>');
//        $(data).each(function (index, num) {
//            $('#SelectModel').append('<option>' + num.Title + '</option>');
//            BodyTable.append(
//                '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                + '<td class="Title">' + num.Title + '</td>'
//                + '<td class="Description">' + num.Description + '</td>'
//                + '<td class="StartDate">' + num.StartDate + '</td>'
//                + '<td class="EndDate">' + num.EndDate + '<a href="#" class="editFromVacancyTable">...edit</a></td></tr>');

//            i = i + 1;
//        });
//        $('#SelectModel').append('<option>Custom Model</option>');
//        $('tr').hover(function () {
//            $(this).css('background-color', '#edf2fa');
//        }, function () {
//            $(this).css('background-color', '');
//        });
//    }
//    function GetHiring(data) {
//        var i = 1;
//        var HeadTable = $('.HiringTable thead');
//        var BodyTable = $('.HiringTable tbody');
//        BodyTable.empty();
//        HeadTable.empty();
//        HeadTable.append(
//            '<th width="10px">№</th>'
//            + '<th width="80px"> Candidat</th>'
//            + '<th width="80px">Users</th>'
//            + '<th width="80px">Status</th>'
//            + '<th width="80px">Vacancy</th>'
//            + '<th width="10px">StatusDate</th>'
//            + '<th width="200px">Commentary</th>');
//        $(data).each(function (index, num) {
//            BodyTable.append(
//                '<tr><td align="center" class="rowNumber" value="' + num.HiringId + '">' + i + '</td>'
//                + '<td class="Candidat" value="' + num.CandidatID + '">' + num.Candidat + '</td>'
//                + '<td class="Users">' + num.User + '</td>'
//                + '<td class="Status" value="' + num.CV + '">' + num.Status + '</td>'
//                + '<td class="Vacancy">' + num.Vacancy + '</td>'
//                + '<td class="StatusDate">' + num.StatusDate + '</td>'
//                + '<td class="Commentary">' + num.Comm + '<a href="#" class="editFromHiringTable">...edit</a></td></tr>')
//            i = i + 1;
//        });
//        $('tr').hover(function () {
//            $(this).css('background-color', '#edf2fa');
//        }, function () {
//            $(this).css('background-color', '');
//        });
//    }
//    function GetUsers(data) {
//        var i = 1;
//        var HeadTable = $('.UsersTable thead');
//        var BodyTable = $('.UsersTable tbody');
//        BodyTable.empty();
//        HeadTable.empty();
//        HeadTable.append(
//            '<tr><th width="10px">№</th>'
//            + '<th width="80px">Username</th>'
//            + '<th width="80px">Password</th>'
//            + '<th width="80px">FirstName</th>'
//            + '<th width="80px">LastName</th>'
//            + '<th width="80px">E-mail</th>'
//            + '<th width="50px">RoleId</th>'
//            + '<th width="80px">StartDate</th>'
//            + '<th width="80px">EndDate</th></tr>');
//        $(data).each(function (index, num) {

//            if (role === "Admin") {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="Username">' + num.Username + '</td>'
//                    + '<td class="Password">' + num.Password + '</td>'
//                    + '<td class="FirstName">' + num.FirstName + '</td>'
//                    + '<td class="LastName">' + num.LastName + '</td>'
//                    + '<td class="Email">' + num.Email + '</td>'
//                    + '<td class="RoleID">' + num.RoleId + '</td>'
//                    + '<td class="StartDate">' + num.StartDate + '</td>'
//                    + '<td class="EndDate">' + num.EndDate + '<a href="#" class="editFromUsersTable">...edit</a></td></tr>')//
//                i = i + 1;
//            } else {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="Username">' + num.Username + '</td>'
//                    + '<td class="Password">' + num.Password + '</td>'
//                    + '<td class="FirstName">' + num.FirstName + '</td>'
//                    + '<td class="LastName">' + num.LastName + '</td>'
//                    + '<td class="Email">' + num.Email + '</td>'
//                    + '<td class="RoleID">' + num.RoleId + '</td>'
//                    + '<td class="StartDate">' + num.StartDate + '</td>'
//                    + '<td class="EndDate">' + num.EndDate + '</td></tr>')//<a href="#" class="editFromUsersTable">...edit</a>
//                i = i + 1;
//            }

//        });
//        $('tr').hover(function () {
//            $(this).css('background-color', '#edf2fa');
//        }, function () {
//            $(this).css('background-color', '');
//        });
//    }
//    function GetEmployees(data) {
//        var i = 1;
//        var HeadTable = $('.EmployeesTable thead');
//        var BodyTable = $('.EmployeesTable tbody');
//        BodyTable.empty();
//        HeadTable.empty();
//        HeadTable.append(
//            '<tr><th width="10px">№</th>'
//            + '<th width="80px">FirstName</th>'
//            + '<th width="80px">LastName</th>'
//            + '<th width="80px">Phone</th>'
//            + '<th width="100px">E-mail</th>'
//            + '<th width="50px">Department</th>'
//            + '<th width="50px">Position</th>'
//            + '<th width="20px">Hiring</th>'
//            + '<th width="80px">StartDate</th>'
//            /*+ '<th width="80px">EndDate</th></tr>'*/);
//        $(data).each(function (index, num) {
//            if (role === "Admin") {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="FirstName">' + num.FirstName + '</td>'
//                    + '<td class="LastName">' + num.LastName + '</td>'
//                    + '<td class="Phone">' + num.Phone + '</td>'
//                    + '<td class="Email">' + num.Email + '</td>'
//                    + '<td class="Department">' + num.Department + '</td>'
//                    + '<td class="Position">' + num.Position + '</td>'
//                    + '<td class="Hiring">' + num.Hiring + '</td>'
//                    + '<td class="StartDate">' + num.StartDate + '<a href="#" class="editFromEmployeesTable">...edit</a></td>');
//                    //+ '<td class="EndDate">' + num.EndDate + '<a href="#" class="editFromEmployeesTable">...edit</a></td></tr>')//
//                i = i + 1;
//            } else {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="FirstName">' + num.FirstName + '</td>'
//                    + '<td class="LastName">' + num.LastName + '</td>'
//                    + '<td class="Phone">' + num.Phone + '</td>'
//                    + '<td class="Email">' + num.Email + '</td>'
//                    + '<td class="Department">' + num.Department + '</td>'
//                    + '<td class="Position">' + num.Position + '</td>'
//                    + '<td class="Hiring">' + num.Hiring + '</td>'
//                    + '<td class="StartDate">' + num.StartDate + '</td>');
//                    //+ '<td class="EndDate">' + num.EndDate + '</td></tr>')//<a href="#" class="editFromEmployeesTable">...edit</a>
//                i = i + 1;
//            }

//        });
//        $('tr').hover(function () {
//            $(this).css('background-color', '#edf2fa');
//        }, function () {
//            $(this).css('background-color', '');
//        });
//    }
//    function GetDictionary(data) {
//        var i = 1;
//        var HeadTable = $('.DictionaryTable thead');
//        var BodyTable = $('.DictionaryTable tbody');
//        BodyTable.empty();
//        HeadTable.empty();
//        HeadTable.append(
//            '<tr><th width="10px">№</th>'
//            + '<th width="80px">Name</th>'
//            + '<th width="80px">Type</th>'
//            + '<th width="200px">Description</th></tr>');
//        $(data).each(function (index, num) {
//            if (role === "Admin") {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="Name">' + num.Name + '</td>'
//                    + '<td class="Type">' + num.Type + '</td>'
//                    + '<td class="Description">' + num.Description + '<a href="#" class="editFromDictionaryTable">...edit</a></td>')//
//                i = i + 1;
//            } else {
//                BodyTable.append(
//                    '<tr><td align="center" class="rowNumber" value="' + num.Id + '">' + i + '</td>'
//                    + '<td class="Name">' + num.Name + '</td>'
//                    + '<td class="Type">' + num.Type + '</td>'
//                    + '<td class="Description">' + num.Description + '</td>')//<a href="#" class="editFromDictionaryTable">...edit</a>
//                i = i + 1;
//            }

//        });
//        $('tr').hover(function () {
//            $(this).css('background-color', '#edf2fa');
//        }, function () {
//            $(this).css('background-color', '');
//        });
//    }
//    //history.replaceState({}, false, "admin");
//    $('.PopUpAddVacancyWindow-Behind').hide();
//    $('.topnav .LinkToModal').on('click', function () {
//        $('.LinkToModal').removeClass('topNavSelected');
//        $(this).addClass('topNavSelected');

//        if ($('#VacanciesModal-btn').hasClass('topNavSelected')) {
//            $('.VacanciesTable').css('display', '');
//            $('.HiringTable').css('display', 'none');
//            $('.UsersTable').css('display', 'none');
//            $('.EmployeesTable').css('display', 'none');
//            $('.DictionaryTable').css('display', 'none');
//            $('.addUser').hide();
//            $('.addVacancies').show();
//            target = 'GetVacancy';
//        }
//        else if ($('#HiringModal-btn').hasClass('topNavSelected')) {
//            $('.VacanciesTable').css('display', 'none');
//            $('.HiringTable').css('display', '');
//            $('.UsersTable').css('display', 'none');
//            $('.EmployeesTable').css('display', 'none');
//            $('.DictionaryTable').css('display', 'none');
//            $('.addUser').hide();
//            $('.addVacancies').hide();
//            target = 'GetHiring';
//        }
//        else if ($('#UsersModal-btn').hasClass('topNavSelected')) {
//            $('.VacanciesTable').css('display', 'none');
//            $('.HiringTable').css('display', 'none');
//            $('.UsersTable').css('display', '');
//            $('.EmployeesTable').css('display', 'none');
//            $('.DictionaryTable').css('display', 'none');
//            $('.addVacancies').hide();
//            if (role === "Admin")
//                $('.addUser').show();
//            else
//                $('.addUser').hide();
//            target = 'GetUsers';
//        }
//        else if ($('#EmployeesModal-btn').hasClass('topNavSelected')) {
//            $('.VacanciesTable').css('display', 'none');
//            $('.HiringTable').css('display', 'none');
//            $('.UsersTable').css('display', 'none');
//            $('.EmployeesTable').css('display', '');
//            $('.DictionaryTable').css('display', 'none');
//            $('.addUser').hide();
//            $('.addVacancies').hide();
//            target = 'GetEmployees';
//        }
//        else if ($('#DictionaryModal-btn').hasClass('topNavSelected')) {
//            $('.VacanciesTable').css('display', 'none');
//            $('.HiringTable').css('display', 'none');
//            $('.UsersTable').css('display', 'none');
//            $('.EmployeesTable').css('display', 'none');
//            $('.DictionaryTable').css('display', '');
//            $('.addUser').hide();
//            $('.addVacancies').hide();
//            target = 'GetDictionary';
//        }

//        $.ajax({
//            method: "GET",
//            url: "/Admin/" + target,
//            data:
//            {
//                action: "GetComponents",
//                target: target
//            },
//            dataType: 'json',
//            success: function (data) {
//                switch (target) {
//                    case 'GetVacancy':
//                        {
//                            GetVacancy(data);
//                            break;
//                        }
//                    case 'GetHiring':
//                        {
//                            GetHiring(data);
//                            break;
//                        }
//                    case 'GetUsers':
//                        {
//                            GetUsers(data);
//                            break;
//                        }
//                    case 'GetEmployees':
//                        {
//                            GetEmployees(data);
//                            break;
//                        }
//                    case 'GetDictionary':
//                        {
//                            GetDictionary(data);
//                            break;
//                        }
//                }
//                //$(document).on('click', function (e) {
//                //    if ($(".PopUpAddVacancyWindow").hasClass("isOpen"))
//                //        $('.PopUpAddVacancyWindow-Behind').removeClass("isOpen");
//                //});

//                $('tr').hover(function () {
//                    $(this).css('background-color', '#edf2fa');
//                }, function () {
//                    $(this).css('background-color', '');
//                });

//                $('.editFromHiringTable').on('click', function (e) {
//                    var element = e.target;
//                    ID =                $(element).parent().parent().find('.rowNumber').attr('value');
//                    CandidatID =        $(element).parent().parent().find('.Candidat').attr('value');
//                    var CandidatName =  $(element).parent().parent().find('.Candidat').html();
//                    var WhoEdited =     $(element).parent().parent().find('.Users').html();
//                    var Vacancy =       $(element).parent().parent().find('.Vacancy').html();
//                    var LastEdited =    $(element).parent().parent().find('.StatusDate').html();
//                    var Commentary =    $(element).parent().parent().find('.Commentary').text();
//                    var StatusName = $(element).parent().parent().find('.Status').html();
//                    var StatusValue = $(element).parent().parent().find('.Status').attr('value');
//                    //alert(ID);
//                    $('.PopUpEditHiringWindow').find('.CandidatName').html("Candidat Name: " + CandidatName);
//                    $('.PopUpEditHiringWindow').find('.CandidatEditedBy').html("EditedBy: " + WhoEdited);
//                    $('.PopUpEditHiringWindow').find('.CandidatSelectedVacancy').html("Selected Vacancy: " + Vacancy);
//                    $('.PopUpEditHiringWindow').find('.CandidatLastEdit').html("Last Edited Date: " + LastEdited);
//                    $('.PopUpEditHiringWindow').find('#CandidatStatus').val(StatusName);
//                    $('.PopUpEditHiringWindow').find('#CandidatStatus').val(StatusValue);
//                    $('.PopUpEditHiringWindow').find('#HiringDesc').text(Commentary.replace("...edit", ""));

//                    $('.PopUpEditHiringWindow').find('#DeleteHiringButton').on('click', function () {

//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/DeleteCandidat",
//                            data: {
//                                ID: ID,
//                            },
//                            dataType: 'json',
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/" + target,
//                                data:
//                                {
//                                    action: "GetComponents",
//                                    target: target
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetHiring(data);
//                                }
//                            });
//                        });
//                        $('.PopUpEditHiringWindow-Behind').hide();
//                        $('.PopUpCandidatInfoWindow').hide();
//                    });

//                    $('.PopUpEditHiringWindow').find('#ShowCandidatInfo').hover(function () {

//                        var CandidatInfo = $('.PopUpEditHiringWindow-Behind').find('.PopUpCandidatInfoWindow');
//                        CandidatInfo.show();
//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/GetCandidat",
//                            data: {
//                                ID: CandidatID,
//                            },
//                            dataType: 'json',
//                            success: function (data) {
//                                CandidatInfo.find(".CandidatNameWithSurname").html("Candidat Name: " + data.FirstName + " " + data.LastName);
//                                CandidatInfo.find(".CandidatEmail").html("Email: " + data.Email);
//                                CandidatInfo.find(".CandidatPhone").html("Phone: " + data.Phone);
//                                //GetVacancy(data);
//                            }
//                        });
//                    },
//                        function () {
//                            var CandidatInfo = $('.PopUpEditHiringWindow-Behind').find('.PopUpCandidatInfoWindow');
//                            CandidatInfo.hide();
//                        }
//                    );

//                    //$('.PopUpEditHiringWindow').find('#ShowCandidatCV').on('click', function () {
//                    //    $.ajax({
//                    //        method: 'POST',
//                    //        url: '/Admin/' + target + '/GetCV',
//                    //        data: {
//                    //            ID: CandidatID,
//                    //        },
//                    //        dataType: 'json',
//                    //        success: function (data) {

//                    //        }
//                    //    });
//                    //});

//                    $('.PopUpEditHiringWindow').find('#CandidatStatus').hover(function () {

//                        $(this).html($(this).val());
//                        switch ($(this).val()) {
//                            case "New":
//                                $(this).css('background-color', 'blue');
//                                break;
//                            case "Archieved":
//                                $(this).css('background-color', 'yellow');
//                                break;
//                            case "Rejected":
//                                $(this).css('background-color', 'red');
//                                break;
//                            case "Hired":
//                                $(this).css('background-color', 'green');
//                                break;
//                            default:
//                                $(this).css('background-color', 'lightgreen');
//                                break;
//                        }
//                    }, function () {
//                        $(this).html('Status');
//                        //$('.PopUpEditHiringWindow').find('#CandidatStatus').style('background-color', 'limegreen');
//                        $(this).css('background-color', 'lightgreen');
//                    });

//                    $('.PopUpEditHiringWindow-Behind').show();
//                    $('.PopUpCandidatInfoWindow').hide();
//                });
//                $('#ShowCandidatInfo').on('click', function () {
//                    //alert(ID);
//                    $('.PopUpCandidatInfoWindow').show();
//                });

//                $('#ExitFromHiringWindow').on('click', function () {
//                    $('.PopUpEditHiringWindow-Behind').hide();
//                    $('.PopUpCandidatInfoWindow').hide();
//                });

//                $('#ExitFromCandidatInfoWindow').on('click', function () {
//                    $('.PopUpCandidatInfoWindow').hide();
//                });

//                $('.PopUpEditHiringWindow-Behind').on('mousedown', function (e) {
//                    if (!(($(e.target).closest(".PopUpEditHiringWindow").length > 0) || ($(e.target).closest("#ExitFromHiringWindow").length > 0) || ($(e.target).closest(".PopUpCandidatInfoWindow").length > 0))) {
//                        $('.PopUpEditHiringWindow-Behind').hide();
//                    }
//                });

//                $('.editFromUsersTable').on('click', function (event) {
//                    var element = event.target;
//                    ID = $(this).parent().parent().find('.rowNumber').attr('value');
//                    var UserFirstName = $(element).parent().parent().find('.FirstName').text();
//                    var UserLastName = $(element).parent().parent().find('.LastName').text();
//                    var UserUsername = $(element).parent().parent().find('.Username').text();
//                    var UserPassword = $(element).parent().parent().find('.Password').text();
//                    var UserEmail = $(element).parent().parent().find('.Email').text();
//                    //var UserEndDate = $(element).parent().parent().find('.EndDate').text();

//                    $('.PopUpEditUserWindow').find('#UserFirstName').val(UserFirstName);
//                    $('.PopUpEditUserWindow').find('#UserLastName').val(UserLastName);
//                    $('.PopUpEditUserWindow').find('#UserUsername').val(UserUsername);
//                    $('.PopUpEditUserWindow').find('#UserPassword').val(UserPassword);
//                    $('.PopUpEditUserWindow').find('#UserEmail').val(UserEmail);
//                    //$('.PopUpEditUserWindow').find('#UserEndDate').val(UserEndDate.replace("...edit", ""));

//                    $('.PopUpEditUserWindow').find('.PopUpEditUserWindow').find('#DeleteUserButton').on('click', function () {

//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/DeleteUser",
//                            data: {
//                                ID: ID,
//                            },
//                            dataType: 'json',
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/" + target,
//                                data:
//                                {
//                                    action: "GetComponents",
//                                    target: target
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetUsers(data);
//                                }
//                            });
//                        });
//                        $('.PopUpEditUserWindow-Behind').hide();
//                    });

//                    $('.PopUpEditUserWindow').find('#EditUserButton').on('click', function () {
//                        var a = "adsa0";
//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/EditUser",
//                            data:
//                            {
//                                ID: ID,
//                                UserFirstName: $('.PopUpEditUserWindow').find('#UserFirstName').val(),
//                                UserLastName: $('.PopUpEditUserWindow').find('#UserLastName').val(),
//                                UserUsername: $('.PopUpEditUserWindow').find('#UserUsername').val(),
//                                UserPassword: $('.PopUpEditUserWindow').find('#UserPassword').val(),
//                                UserEmail: $('.PopUpEditUserWindow').find('#UserEmail').val(),
//                                //UserEndDate: $('.PopUpEditUserWindow').find('#UserEndDate').val()
//                            },
//                            dataType: 'json'
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/GetUsers",
//                                data:
//                                {
//                                    action: "GetComponents",
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetUsers(data);
//                                }
//                            });
//                        }); // end ajax
//                        $('.PopUpEditUserWindow-Behind').hide();
//                    });

//                    $('.PopUpEditUserWindow-Behind').show();


//                    //alert(ID);
//                });

//                $('.PopUpEditUserWindow-Behind').on('mousedown', function (e) {
//                    if (!(($(e.target).closest(".PopUpEditUserWindow").length > 0) )) {
//                        $('.PopUpEditUserWindow-Behind').hide();
//                    }
//                });

//                $('.editFromEmployeesTable').on('click', function () {
//                    var element = event.target;
//                    ID = $(element).parent().parent().find('.rowNumber').attr('value');
//                    var EmployeeFirstName = $(element).parent().parent().find('.FirstName').text();
//                    var EmployeeLastName = $(element).parent().parent().find('.LastName').text();
//                    var EmployeePhone = $(element).parent().parent().find('.Phone').text();
//                    var EmployeeEmail = $(element).parent().parent().find('.Email').text();
//                    var EmployeeDepartment = $(element).parent().parent().find('.Department').text();

//                    $('.PopUpEditEmployeeWindow').find('#EmployeeFirstName').val(EmployeeFirstName);
//                    $('.PopUpEditEmployeeWindow').find('#EmployeeLastName').val(EmployeeLastName);
//                    $('.PopUpEditEmployeeWindow').find('#EmployeePhone').val(EmployeePhone);
//                    $('.PopUpEditEmployeeWindow').find('#EmployeeEmail').val(EmployeeEmail);
//                    $('.PopUpEditEmployeeWindow').find('#EmployeeDepartment').val(EmployeeDepartment);



//                    $('.PopUpEditEmployeeWindow').find('#DeleteEmployeeButton').on('click', function () {

//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/DeleteEmployee",
//                            data: {
//                                ID: ID,
//                            },
//                            dataType: 'json',
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/" + target,
//                                data:
//                                {
//                                    action: "GetComponents",
//                                    target: target
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetEmployees(data);
//                                }
//                            });
//                        });
//                        $('.PopUpEditEmployeeWindow-Behind').hide();
//                    });

//                    $('.PopUpEditEmployeeWindow').find('#EditEmployeeButton').on('click', function () {
//                        var a = "adsa0";
//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/EditEmployee",
//                            data:
//                            {
//                                ID: ID,
//                                EmployeeFirstName: $('.PopUpEditEmployeeWindow').find('#EmployeeFirstName').val(),
//                                EmployeeLastName: $('.PopUpEditEmployeeWindow').find('#EmployeeLastName').val(),
//                                EmployeePhone: $('.PopUpEditEmployeeWindow').find('#EmployeePhone').val(),
//                                EmployeeDepartment: $('.PopUpEditEmployeeWindow').find('#EmployeeDepartment').val(),
//                                EmployeeEmail: $('.PopUpEditEmployeeWindow').find('#EmployeeEmail').val(),
//                            },
//                            dataType: 'json'
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/GetEmployees",
//                                data:
//                                {
//                                    action: "GetComponents",
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetEmployees(data);
//                                }
//                            });
//                        }); // end ajax
//                        $('.PopUpEditEmployeeWindow-Behind').hide();
//                    });

//                    $('.PopUpEditEmployeeWindow-Behind').show();
//                });


//                $('.PopUpEditEmployeeWindow-Behind').on('mousedown', function (e) {
//                    if (!(($(e.target).closest(".PopUpEditEmployeeWindow").length > 0))) {
//                        $('.PopUpEditEmployeeWindow-Behind').hide();
//                    }
//                });

//                $('.editFromDictionaryTable').on('click', function () {
//                    var element = event.target;
//                    ID = $(this).parent().parent().find('.rowNumber').attr('value');
//                    var DictionaryName = $(element).parent().parent().find('.Name').text();
//                    var DictionaryGroup = $(element).parent().parent().find('.Type').text();
//                    var DictionaryDescription = $(element).parent().parent().find('.Description').text();

//                    $('.PopUpEditDictionaryWindow').find('#DictionaryName').val(DictionaryName);
//                    $('.PopUpEditDictionaryWindow').find('#DictionaryGroup').val(DictionaryGroup);
//                    $('.PopUpEditDictionaryWindow').find('#DictionaryDescription').val(DictionaryDescription.replace("...edit", ""));


//                    $('.PopUpEditDictionaryWindow').find('#DeleteDictionaryButton').on('click', function () {

//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/DeleteDictionary",
//                            data: {
//                                ID: ID,
//                            },
//                            dataType: 'json',
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/" + target,
//                                data:
//                                {
//                                    action: "GetComponents",
//                                    target: target
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetDictionary(data);
//                                }
//                            });
//                        });
//                        $('.PopUpEditDictionaryWindow-Behind').hide();
//                    });

//                    $('.PopUpEditDictionaryWindow').find('#EditDictionaryButton').on('click', function () {
//                        $.ajax({
//                            method: "POST",
//                            url: "/Admin/" + target + "/EditDictionary",
//                            data:
//                            {
//                                ID: ID,
//                                DictionaryName: $('.PopUpEditDictionaryWindow').find('#DictionaryName').val(),
//                                DictionaryGroup: $('.PopUpEditDictionaryWindow').find('#DictionaryGroup').val(),
//                                DictionaryDescription: $('.PopUpEditDictionaryWindow').find('#DictionaryDescription').val(),
//                            },
//                            dataType: 'json'
//                        }).always(function () {
//                            $.ajax({
//                                method: "GET",
//                                url: "/Admin/GetDictionary",
//                                data:
//                                {
//                                    action: "GetComponents",
//                                },
//                                dataType: 'json',
//                                success: function (data) {
//                                    GetDictionary(data);
//                                }
//                            });
//                        }); // end ajax
//                        $('.PopUpEditDictionaryWindow-Behind').hide();
//                    });

//                    $('.PopUpEditDictionaryWindow-Behind').show();
//                });


//                $('.PopUpEditDictionaryWindow-Behind').on('mousedown', function (e) {
//                    if (!(($(e.target).closest(".PopUpEditDictionaryWindow").length > 0))) {
//                        $('.PopUpEditDictionaryWindow-Behind').hide();
//                    }
//                });
//            }//end success



//        });
//        // end ajax function

//    });
//    //window.location.("/Admin/GetVacancy")

//    //#region Work with vacancies table // Add, Edit, Delete, 

//    $('#EditVacancyButton').on('click', function () {
//        $('.PopUpAddVacancyWindow-Behind').hide();
//        $.ajax({
//            method: "POST",
//            url: "/Admin/" + target + "/EditVacancy",
//            data:
//            {
//                ID: ID,
//                Title: $('#VacTitle').val(),
//                Description: $('#VacancyDesc').val()
//            },
//            dataType: 'json'

//        }).always(function () {
//            $.ajax({
//                method: "GET",
//                url: "/Admin/GetVacancy",
//                data:
//                {
//                    action: "GetComponents",
//                },
//                dataType: 'json',
//                success: function (data) {
//                    GetVacancy(data);
//                }
//            });
//        }); // end ajax
//        //window.location.replace("/Admin");
//    }); // End edit button

//    $('#DeleteVacancyButton').on('click', function () {
//        $('.PopUpAddVacancyWindow-Behind').hide();
//        $.ajax({
//            method: "POST",
//            url: "/Admin/ " + target + "/DeleteVacancy",
//            data:
//            {
//                ID: ID
//            },
//            dataType: 'json'
//        }).always(function () {
//            $.ajax({
//                method: "GET",
//                url: "/Admin/GetVacancy",
//                data:
//                {
//                    action: "GetComponents",
//                },
//                dataType: 'json',
//                success: function (data) {
//                    GetVacancy(data);
//                }
//            });
//        }); // end ajax
//    });// End delete function

//    $('#ExitFromVacancyWindow').on('click', function () {
//        $('.PopUpAddVacancyWindow-Behind').hide();
//    });

//    $('.PopUpAddVacancyWindow-Behind').on('mousedown', function (e) {
//        if (!(($(e.target).closest(".PopUpAddVacancyWindow").length > 0) || ($(e.target).closest("#ExitFromVacancyWindow").length > 0))) {
//            $('.PopUpAddVacancyWindow-Behind').hide();
//        }
//    });



//    $(".VacanciesTable").on('click', function (e) {
//        var element = e.target;
//        if (e.target.matches('.editFromVacancyTable')) {
//            $('.PopUpAddVacancyWindow-Behind').show();
//            $('#AddVacancyButton').hide();
//            $('#EditVacancyButton').show();
//            $('#DeleteVacancyButton').show();
//            ID = $(e.target).parent().parent().find('.rowNumber').attr('value');
//            //alert(ID);
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/EditVacancyMenu",
//                data:
//                {
//                    ID: ID
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('#SelectModel').val('');
//                        $('#VacTitle').val(data.VacancyTitle);
//                        $('#VacancyDesc').val(data.VacancyDescription);
//                    });
//                }// end success
//            }); // end ajax

//        }
//    });



//    $('#AddVacancyButton').on('click', function () {
//        $('.PopUpAddVacancyWindow-Behind').hide();
//        $.ajax({
//            method: "POST",
//            url: "/Admin/ " + target + "/SetNewVacancy",
//            data:
//            {
//                Title: $('#VacTitle').val(),
//                Description: $('#VacancyDesc').val()
//            },
//            dataType: 'json'
//        }) // end ajax
//        window.location.reload();
//    }); // End add button

//    $('.addVacancies').on('click', function () {
//        $('.PopUpAddVacancyWindow-Behind').show();
//        $('#AddVacancyButton').show();
//        $('#EditVacancyButton').hide();
//        $('#DeleteVacancyButton').hide();
//    });



//    $('.PopUpAddUserWindow-Behind').on('mousedown', function (e) {
//        if (!(($(e.target).closest(".PopUpAddUserWindow").length > 0))) {
//            $('.PopUpAddUserWindow-Behind').hide();
//        }
//    });


//    $('#SelectModel').change(function () {
//        if ($('#SelectModel').val() === "Custom Model" || $('#SelectModel').val() === "Select Model...") {
//            //$('#VacTitle').removeAttr('readonly', 'readonly');
//            //$('#VacancyDesc').removeAttr('readonly', 'readonly');
//            $('#VacTitle').val('');
//            $('#VacancyDesc').val('');
//        } else {
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/getVacancyV",
//                data:
//                {
//                    Title: $('#SelectModel').val()
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('#VacTitle').val(data.Title);
//                        //$('#VacTitle').attr('readonly', 'readonly');
//                        $('#VacancyDesc').val(data.Description);
//                        //$('#VacancyDesc').attr('readonly', 'readonly');
//                    });
//                }// end success
//            }) // end ajax
//        }
//    }); // end selectModel change function
//    //$('.PopUpAddVacancyWindow-Behind').on(click, function () {
//    //    $('.PopUpAddVacancyWindow-Behind').hide();
//    //})
//    //#endregion
//    $('#CandidatStatus').on('click', function () {
//        var status = GetNextStatus($('#CandidatStatus').val());
//        $('#CandidatStatus').val(status);
//        $('#CandidatStatus').text(status);
//        switch ($('#CandidatStatus').val()) {
//            case "New":
//                $('#CandidatStatus').css('background-color', 'blue');
//                break;
//            case "Archieved":
//                $('#CandidatStatus').css('background-color', 'yellow');
//                break;
//            case "Rejected":
//                $('#CandidatStatus').css('background-color', 'red');
//                break;
//            case "Hired":
//                $('#CandidatStatus').css('background-color', 'green');
//                break;
//            default:
//                $('#CandidatStatus').css('background-color', 'lightgreen');
//                break;
//        }
//    });




//    $(".HiringTable").on('click', function (e) {
//        var element = e.target;
//        if (e.target.matches('.editFromHiringTable')) {
//            ID = $(element).parent().parent().find('.rowNumber').attr('value');
//            CandidatID = $(element).parent().parent().find('.Candidat').attr('value');
//            var CandidatName = $(element).parent().parent().find('.Candidat').html();
//            var WhoEdited = $(element).parent().parent().find('.Users').html();
//            var Vacancy = $(element).parent().parent().find('.Vacancy').html();
//            var LastEdited = $(element).parent().parent().find('.StatusDate').html();
//            var Commentary = $(element).parent().parent().find('.Commentary').text();
//            var StatusName = $(element).parent().parent().find('.Status').html();
//            var StatusValue = $(element).parent().parent().find('.Status').attr('value');
//            //alert(ID);
//            $('.PopUpEditHiringWindow').find('.CandidatName').html("Candidat Name: " + CandidatName);
//            $('.PopUpEditHiringWindow').find('.CandidatEditedBy').html("EditedBy: " + WhoEdited);
//            $('.PopUpEditHiringWindow').find('.CandidatSelectedVacancy').html("Selected Vacancy: " + Vacancy);
//            $('.PopUpEditHiringWindow').find('.CandidatLastEdit').html("Last Edited Date: " + LastEdited);
//            $('.PopUpEditHiringWindow').find('#CandidatStatus').val(StatusName);
//            $('#ShowCandidatCV').find('#DownloadCV').attr('href', StatusValue);
//            $('.PopUpEditHiringWindow').find('#CandidatStatus').val(StatusValue);
//            $('.PopUpEditHiringWindow').find('#HiringDesc').text(Commentary.replace("...edit", ""));

//            $('.PopUpEditHiringWindow').find('#DeleteHiringButton').on('click', function () {

//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/DeleteCandidat",
//                    data: {
//                        ID: ID,
//                    },
//                    dataType: 'json',
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/" + target,
//                        data:
//                        {
//                            action: "GetComponents",
//                            target: target
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetHiring(data);
//                        }
//                    });
//                });
//                $('.PopUpEditHiringWindow-Behind').hide();
//                $('.PopUpCandidatInfoWindow').hide();
//            });

//            $('.PopUpEditHiringWindow').find('#ShowCandidatInfo').hover(function () {

//                var CandidatInfo = $('.PopUpEditHiringWindow-Behind').find('.PopUpCandidatInfoWindow');
//                CandidatInfo.show();
//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/GetCandidat",
//                    data: {
//                        ID: CandidatID,
//                    },
//                    dataType: 'json',
//                    success: function (data) {
//                        CandidatInfo.find(".CandidatNameWithSurname").html("Candidat Name: " + data.FirstName + " " + data.LastName);
//                        CandidatInfo.find(".CandidatEmail").html("Email: " + data.Email);
//                        CandidatInfo.find(".CandidatPhone").html("Phone: " + data.Phone);
//                        //GetVacancy(data);
//                    }
//                });
//            },
//                function () {
//                    var CandidatInfo = $('.PopUpEditHiringWindow-Behind').find('.PopUpCandidatInfoWindow');
//                    CandidatInfo.hide();
//                }
//            );

//            $('.PopUpEditHiringWindow').find('#ShowCandidatCV').on('click', function () {
//                //$('#ShowCandidatCV').find('#DownloadCV').attr('Download', StatusValue);

//                //$.ajax({
//                //    method: 'POST',
//                //    url: '/Admin/' + target + '/GetCV',
//                //    data: {
//                //        ID: CandidatID,
//                //    },
//                //    dataType: 'json',
//                //    success: function (data) {

//                //    }
//                //});
//            });

//            $('.PopUpEditHiringWindow').find('#CandidatStatus').hover(function () {

//                $(this).html($(this).val());
//                switch ($(this).val()) {
//                    case "New":
//                        $(this).css('background-color', 'blue');
//                        break;
//                    case "Archieved":
//                        $(this).css('background-color', 'yellow');
//                        break;
//                    case "Rejected":
//                        $(this).css('background-color', 'red');
//                        break;
//                    case "Hired":
//                        $(this).css('background-color', 'green');
//                        break;
//                    default:
//                        $(this).css('background-color', 'lightgreen');
//                        break;
//                }
//            }, function () {
//                $(this).html('Status');
//                //$('.PopUpEditHiringWindow').find('#CandidatStatus').style('background-color', 'limegreen');
//                $(this).css('background-color', 'lightgreen');
//            });



//            $('.PopUpEditHiringWindow-Behind').show();
//            $('.PopUpCandidatInfoWindow').hide();
//            //alert(ID);
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/EditHiringMenu",
//                data:
//                {
//                    ID: ID
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('.CandidatName').val(data.HiringCandidat);
//                        $('.CandidatEditedBy').val(data.HiringUsers);
//                        $('.CandidatSelectedVacancy').val(data.HiringVacancy);
//                        $('.CandidatLastEdit').val(data.HiringStatusDate);
//                        $('#CandidatStatus').val(data.HiringStatus);
//                        $('#HiringDesc').val(data.HiringComm);
//                    });
//                }// end success
//            }); // end ajax

//        }
//    });

//    $('#EditHiringButton').on('click', function () {
//        var a = $('#CandidatStatus').val();
//        $.ajax({
//            method: "POST",
//            url: "/Admin/" + target + "/EditHiring",
//            data:
//            {
//                ID: ID,
//                CandidatID: CandidatID,
//                Status: $('#CandidatStatus').val(),
//                Description: $('#HiringDesc').val()
//            },
//            dataType: 'json'
//        }).always(function () {
//            $.ajax({
//                method: "GET",
//                url: "/Admin/GetHiring",
//                data:
//                {
//                    action: "GetComponents",
//                },
//                dataType: 'json',
//                success: function (data) {
//                    GetHiring(data);
//                }
//            });
//        }); // end ajax
//        $('.PopUpEditHiringWindow-Behind').hide();
//    });

//    $(".EmployeesTable").on('click', function (e) {
//        var element = e.target;
//        if (e.target.matches('.editFromEmployeesTable')) {
//            ID = $(element).parent().parent().find('.rowNumber').attr('value');
//            var EmployeeFirstName = $(element).parent().parent().find('.FirstName').text();
//            var EmployeeLastName = $(element).parent().parent().find('.LastName').text();
//            var EmployeePhone = $(element).parent().parent().find('.Phone').text();
//            var EmployeeEmail = $(element).parent().parent().find('.Email').text();
//            var EmployeeDepartment = $(element).parent().parent().find('.Department').text();

//            $('.PopUpEditEmployeeWindow').find('#EmployeeFirstName').val(EmployeeFirstName);
//            $('.PopUpEditEmployeeWindow').find('#EmployeeLastName').val(EmployeeLastName);
//            $('.PopUpEditEmployeeWindow').find('#EmployeePhone').val(EmployeePhone);
//            $('.PopUpEditEmployeeWindow').find('#EmployeeEmail').val(EmployeeEmail);
//            $('.PopUpEditEmployeeWindow').find('#EmployeeDepartment').val(EmployeeDepartment);



//            $('.PopUpEditEmployeeWindow').find('#DeleteEmployeeButton').on('click', function () {

//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/DeleteEmployee",
//                    data: {
//                        ID: ID,
//                    },
//                    dataType: 'json',
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/" + target,
//                        data:
//                        {
//                            action: "GetComponents",
//                            target: target
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetEmployees(data);
//                        }
//                    });
//                });
//                $('.PopUpEditEmployeeWindow-Behind').hide();
//            });

//            $('.PopUpEditEmployeeWindow').find('#EditEmployeeButton').on('click', function () {
//                var a = "adsa0";
//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/EditEmployee",
//                    data:
//                    {
//                        ID: ID,
//                        EmployeeFirstName: $('.PopUpEditEmployeeWindow').find('#EmployeeFirstName').val(),
//                        EmployeeLastName: $('.PopUpEditEmployeeWindow').find('#EmployeeLastName').val(),
//                        EmployeePhone: $('.PopUpEditEmployeeWindow').find('#EmployeePhone').val(),
//                        EmployeeDepartment: $('.PopUpEditEmployeeWindow').find('#EmployeeDepartment').val(),
//                        EmployeeEmail: $('.PopUpEditEmployeeWindow').find('#EmployeeEmail').val(),
//                    },
//                    dataType: 'json'
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/GetEmployees",
//                        data:
//                        {
//                            action: "GetComponents",
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetEmployees(data);
//                        }
//                    });
//                }); // end ajax
//                $('.PopUpEditEmployeeWindow-Behind').hide();
//            });

//            $('.PopUpEditEmployeeWindow-Behind').show();
//            //alert(ID);
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/EditEmployeeMenu",
//                data:
//                {
//                    ID: ID
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $('#EmployeeDepartment').empty();
//                    $(data).each(function (index, data) {
//                        $('#EmployeeFirstName').val(data.FirstName);
//                        $('#EmployeeLastName').val(data.LastName);
//                        $('#EmployeePhone').val(data.Phone);

//                        $('#EmployeeEmail').val(data.Email);
//                        $(data.Department).each(function (index, num) {
//                            if (EmployeeDepartment === num)
//                                $('#EmployeeDepartment').append('<option selected>' + num + '</option>');
//                            else
//                                $('#EmployeeDepartment').append('<option>' + num + '</option>');
//                        });
//                    });
//                }// end success
//            }); // end ajax
//        }
//    });

//    $('.addUser').on('click', function () {
//        $('.PopUpAddUserWindow-Behind').show();
//        $('#AddUserButton').show();
//        $('#EditUserButton').hide();
//        $('#DeleteUserButton').hide();
//        $('#SelectUserModel').empty();
//        $('#SelectUserModel').append('<option selected>Select User...</option>');
//        $.ajax({
//            method: "POST",
//            url: "/Admin/" + target + "/getCandidats",
//            data: "data",
//            dataType: 'json',
//            success: function (data) {
//                $(data).each(function (index, num) {

//                    $('#SelectUserModel').append('<option value="' + num.Id + '">' + num.FirstName + " " + num.LastName + '</option>');
//                })
//            }
//        });
//    });

//    $(".UsersTable").on('click', function (e) {
//        var element = e.target;
//        if (e.target.matches('.editFromUsersTable')) {
//            ID = $(element).parent().parent().find('.rowNumber').attr('value');
//            var UserFirstName = $(element).parent().parent().find('.FirstName').text();
//            var UserLastName = $(element).parent().parent().find('.LastName').text();
//            var UserUsername = $(element).parent().parent().find('.Username').text();
//            var UserPassword = $(element).parent().parent().find('.Password').text();
//            var UserEmail = $(element).parent().parent().find('.Email').text();
//            //var UserEndDate = $(element).parent().parent().find('.EndDate').text();

//            $('.PopUpEditUserWindow').find('#UserFirstName').val(UserFirstName);
//            $('.PopUpEditUserWindow').find('#UserLastName').val(UserLastName);
//            $('.PopUpEditUserWindow').find('#UserUsername').val(UserUsername);
//            $('.PopUpEditUserWindow').find('#UserPassword').val(UserPassword);
//            $('.PopUpEditUserWindow').find('#UserEmail').val(UserEmail);
//            //$('.PopUpEditUserWindow').find('#UserEndDate').val(UserEndDate.replace("...edit", ""));

//            $('.PopUpEditUserWindow').find('#DeleteUserButton').on('click', function () {

//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/DeleteUser",
//                    data: {
//                        ID: ID,
//                    },
//                    dataType: 'json',
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/" + target,
//                        data:
//                        {
//                            action: "GetComponents",
//                            target: target
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetUsers(data);
//                        }
//                    });
//                });
//                $('.PopUpEditUserWindow-Behind').hide();
//            });

//            $('.PopUpEditUserWindow').find('#EditUserButton').on('click', function () {
//                var a = "adsa0";
//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/EditUser",
//                    data:
//                    {
//                        ID: ID,
//                        UserFirstName: $('.PopUpEditUserWindow').find('#UserFirstName').val(),
//                        UserLastName: $('.PopUpEditUserWindow').find('#UserLastName').val(),
//                        UserUsername: $('.PopUpEditUserWindow').find('#UserUsername').val(),
//                        UserPassword: $('.PopUpEditUserWindow').find('#UserPassword').val(),
//                        UserEmail: $('.PopUpEditUserWindow').find('#UserEmail').val(),
//                        //UserEndDate: $('.PopUpEditUserWindow').find('#UserEndDate').val()
//                    },
//                    dataType: 'json'
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/GetUsers",
//                        data:
//                        {
//                            action: "GetComponents",
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetUsers(data);
//                        }
//                    });
//                }); // end ajax
//                $('.PopUpEditUserWindow-Behind').hide();
//            });

//            $('.PopUpEditUserWindow-Behind').show();
//            //alert(ID);
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/EditUserMenu",
//                data:
//                {
//                    ID: ID
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('#UserFirstName').val(data.FirstName);
//                        $('#UserLastName').val(data.LastName);
//                        $('#UserUsername').val(data.Username);
//                        $('#UserPassword').val(data.Password);
//                        $('#UserEmail').val(data.Email);
//                    });
//                }// end success
//            }); // end ajax

//        }
//    });



//    $('#SelectUserModel').change(function () {
//        if ($('#SelectUserModel').val() === "Custom Model" || $('#SelectUserModel').val() === "Select User...") {
//            //$('#VacTitle').removeAttr('readonly', 'readonly');
//            //$('#VacancyDesc').removeAttr('readonly', 'readonly');
//            $('#User-FirstName').val('');
//            $('#User-LastName').val('');
//        } else {
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/getSelectedCandidat",
//                data:
//                {
//                    ID: $('#SelectUserModel').find(':selected').val()
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('#User-FirstName').html(data.FirstName);
//                        //$('#VacTitle').attr('readonly', 'readonly');
//                        $('#User-LastName').html(data.LastName);
//                        //$('#VacancyDesc').attr('readonly', 'readonly');
//                    });
//                }// end success
//            }) // end ajax
//        }
//    }); // end selectModel change function

//    $('#AddUserButton').on('click', function () {

//        $.ajax({
//            method: "POST",
//            url: "/Admin/" + target + "/SetNewUser",
//            data:
//            {
//                FirstName: $('#User-FirstName').val(),
//                LastName: $('#User-LastName').val(),
//                Username: $('#UserName').val(),
//                Password: $('#UserPass').val()
//            },
//            dataType: 'json'
//        }).always(function () {
//            $('.PopUpAddUserWindow-Behind').hide();
//            $.ajax({
//                method: "GET",
//                url: "/Admin/GetUsers",
//                data:
//                {
//                    action: "GetComponents",
//                },
//                dataType: 'json',
//                success: function (data) {
//                    GetUsers(data);
//                }
//            });
//        });
//    });

//    $(".DictionaryTable").on('click', function (e) {
//        var element = e.target;
//        if (e.target.matches('.editFromDictionaryTable')) {
//            ID = $(element).parent().parent().find('.rowNumber').attr('value');
//            var DictionaryName = $(element).parent().parent().find('.Name').text();
//            var DictionaryGroup = $(element).parent().parent().find('.Type').text();
//            var DictionaryDescription = $(element).parent().parent().find('.Description').text();

//            $('.PopUpEditDictionaryWindow').find('#DictionaryName').val(DictionaryName);
//            $('.PopUpEditDictionaryWindow').find('#DictionaryGroup').val(DictionaryGroup);
//            $('.PopUpEditDictionaryWindow').find('#DictionaryDescription').val(DictionaryDescription.replace("...edit", ""));


//            $('.PopUpEditDictionaryWindow').find('#DeleteDictionaryButton').on('click', function () {

//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/DeleteDictionary",
//                    data: {
//                        ID: ID,
//                    },
//                    dataType: 'json',
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/" + target,
//                        data:
//                        {
//                            action: "GetComponents",
//                            target: target
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetDictionary(data);
//                        }
//                    });
//                });
//                $('.PopUpEditDictionaryWindow-Behind').hide();
//            });

//            $('.PopUpEditDictionaryWindow').find('#EditDictionaryButton').on('click', function () {
//                $.ajax({
//                    method: "POST",
//                    url: "/Admin/" + target + "/EditDictionary",
//                    data:
//                    {
//                        ID: ID,
//                        DictionaryName: $('.PopUpEditDictionaryWindow').find('#DictionaryName').val(),
//                        DictionaryGroup: $('.PopUpEditDictionaryWindow').find('#DictionaryGroup').val(),
//                        DictionaryDescription: $('.PopUpEditDictionaryWindow').find('#DictionaryDescription').val(),
//                    },
//                    dataType: 'json'
//                }).always(function () {
//                    $.ajax({
//                        method: "GET",
//                        url: "/Admin/GetDictionary",
//                        data:
//                        {
//                            action: "GetComponents",
//                        },
//                        dataType: 'json',
//                        success: function (data) {
//                            GetDictionary(data);
//                        }
//                    });
//                }); // end ajax
//                $('.PopUpEditDictionaryWindow-Behind').hide();
//            });

//            $('.PopUpEditDictionaryWindow-Behind').show();
//            //alert(ID);
//            $.ajax({
//                method: "POST",
//                url: "/Admin/" + target + "/EditDictionaryMenu",
//                data:
//                {
//                    ID: ID
//                },
//                dataType: 'json',
//                success: function (data) {
//                    $(data).each(function (index, data) {
//                        $('#DictionaryName').val(data.Name);
//                        $('#DictionaryGroup').val(data.Type);
//                        $('#DictionaryDescription').val(data.Description);
//                    });
//                }// end success
//            }); // end ajax

//        }
//    });

//    $.ajax({
//        method: "GET",
//        url: "/Admin/GetVacancy",
//        data:
//        {
//            action: "GetComponents",
//        },
//        dataType: 'json',
//        success: function (data) {
//            GetVacancy(data);
//        }
//    });



$(document).ready(function () {
    // --- Utility Functions & Initialization ---

    let currentItemID = ""; // Stores the ID of the item being edited/deleted
    let currentViewTarget = 'GetVacancy'; // Stores the current API target (e.g., 'GetVacancy')
    let CandidatID = 0;
    const role = getCookie("role");
    const StatusArray = [];

    // HTML Templates for Modals (Simplified, must match your backend form fields)
    const templates = {
        'vacancyForm': `
            <form id="vacancy-form">
                <div class="bodySelection">
                    <label for="SelectModel">Select a Model:</label>
                    <select id="SelectModel">
                        <option value="">Select Model...</option>
                    </select>
                </div>
                <div class="bodySelection">
                    <label for="VacTitle">Title</label>
                    <input type="text" id="VacTitle">
                </div>
                <div class="bodySelection">
                    <label for="SetDate">End Date</label>
                    <input type="date" id="SetDate">
                </div>
                <div class="bodySelection" style="grid-template-columns: 1fr;">
                    <label for="VacancyDesc">Description</label>
                    <textarea id="VacancyDesc" placeholder="Place Description"></textarea>
                </div>
                <div class="button-group">
                    <button type="button" id="EditVacancyButton" class="btn btn-primary" style="display: none;">Save Editing</button>
                    <button type="button" id="DeleteVacancyButton" class="btn btn-secondary" style="display: none;">Delete Vacancy</button>
                    <button type="button" id="AddVacancyButton" class="btn btn-success" style="display: none;">Add Vacancy</button>
                </div>
            </form>`,
        // Add more templates for Hiring, Users, Employees, Dictionary editing here
        // Example structure for a generic edit form:
        'editUserForm': `
            <form id="user-edit-form">
                <div class="bodySelection"><label for="UserFirstName">First Name</label><input type="text" id="UserFirstName"></div>
                <div class="bodySelection"><label for="UserLastName">Last Name</label><input type="text" id="UserLastName"></div>
                <div class="bodySelection"><label for="UserUsername">Username</label><input type="text" id="UserUsername"></div>
                <div class="bodySelection"><label for="UserPassword">Password</label><input type="text" id="UserPassword" placeholder="Leave blank to keep old password"></div>
                <div class="bodySelection"><label for="UserEmail">Email</label><input type="text" id="UserEmail"></div>
                <div class="button-group">
                    <button type="button" id="EditUserButton" class="btn btn-primary">Save Editing</button>
                    <button type="button" id="DeleteUserButton" class="btn btn-secondary">Delete User</button>
                </div>
            </form>`,
        'editHiringForm': `
        <form id="hiring-edit-form">
            <div class="bodySelection">
                <label for="HiringStatus">Current Status</label>
                <input type="text" id="HiringStatus" readonly>
                <button type="button" id="CandidatStatus" class="btn btn-secondary">Next Status</button>
            </div>
            <div class="bodySelection">
                <label for="HiringCommentary">Commentary</label>
                <textarea id="HiringCommentary" rows="4"></textarea>
            </div>
            <div class="button-group">
                <button type="button" id="EditHiringButton" class="btn btn-primary">Save Changes</button>
                <button type="button" id="DeleteHiringButton" class="btn btn-secondary">Remove Record</button>
            </div>
        </form>`,

        'editEmployeeForm': `
        <form id="employee-edit-form">
            <div class="bodySelection"><label for="EmpFirstName">First Name</label><input type="text" id="EmpFirstName"></div>
            <div class="bodySelection"><label for="EmpLastName">Last Name</label><input type="text" id="EmpLastName"></div>
            <div class="bodySelection"><label for="EmpPhone">Phone</label><input type="text" id="EmpPhone"></div>
            <div class="bodySelection"><label for="EmpEmail">Email</label><input type="text" id="EmpEmail"></div>
            <div class="bodySelection"><label for="EmpDepartment">Department</label><input type="text" id="EmpDepartment"></div>
            <div class="bodySelection"><label for="EmpPosition">Position</label><input type="text" id="EmpPosition"></div>
            <div class="bodySelection"><label for="EmpStartDate">Start Date</label><input type="date" id="EmpStartDate"></div>
            <div class="button-group">
                <button type="button" id="EditEmployeeButton" class="btn btn-primary">Save Editing</button>
                <button type="button" id="DeleteEmployeeButton" class="btn btn-secondary">Delete Employee</button>
            </div>
        </form>`,

        'editDictionaryForm': `
        <form id="dictionary-edit-form">
            <div class="bodySelection"><label for="DictName">Name</label><input type="text" id="DictName"></div>
            <div class="bodySelection"><label for="DictType">Type</label><input type="text" id="DictType"></div>
            <div class="bodySelection" style="grid-template-columns: 1fr;">
                <label for="DictDescription">Description</label>
                <textarea id="DictDescription" rows="4"></textarea>
            </div>
            <div class="button-group">
                <button type="button" id="EditDictionaryButton" class="btn btn-primary">Save Editing</button>
                <button type="button" id="DeleteDictionaryButton" class="btn btn-secondary">Delete Item</button>
            </div>
        </form>`
        // ... (other templates omitted for brevity, but follow this structure)
    };

    // Helper to read cookies
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    }

    // Helper to handle AJAX requests and re-render the current view
    function performActionAndRefresh(url, data, targetRefresh) {
        $.post(url, data)
            .done(function (res) {
                // If the action was successful, re-fetch the data for the current view
                $.getJSON("/Admin/" + targetRefresh, { action: "GetComponents", target: targetRefresh }, function (data) {
                    switch (targetRefresh) {
                        case 'GetVacancy': GetVacancy(data); break;
                        case 'GetHiring': GetHiring(data); break;
                        case 'GetUsers': GetUsers(data); break;
                        case 'GetEmployees': GetEmployees(data); break;
                        case 'GetDictionary': GetDictionary(data); break;
                    }
                    closeModal();
                });
            })
            .fail(function (xhr) {
                alert("Action failed! Status: " + xhr.status + "\nMessage: " + (xhr.responseJSON?.message || xhr.responseText));
            });
    }

    // Modal Helpers
    function openModal(title, contentHtml) {
        $('#modal-title').text(title);
        $('#modal-content-area').html(contentHtml);
        $('#global-modal-behind').fadeIn(200);
    }

    function closeModal() {
        $('#global-modal-behind').fadeOut(200);
        currentItemID = ""; // Reset ID on close
    }

    // Initial UI setup
    // Logout
    $('#LogOutModal-btn').on('click', function () {
        document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear cookie
        document.location.href = "/";
    });

    // Close Modal Button
    $('.close-modal-btn').on('click', closeModal);

    // Close modal when clicking outside (the background)
    $('#global-modal-behind').on('click', function (e) {
        if (e.target.id === 'global-modal-behind') {
            closeModal();
        }
    });

    // Fetch Statuses (Initial load)
    $.getJSON("/Admin/GetStatuses", { action: "GetComponents" }, function (data) {
        $.each(data, function (_, num) { StatusArray.push(num); });
    });

    function GetNextStatus(currentStatus) {
        var index = StatusArray.indexOf(currentStatus);
        return (index >= 0 && index < StatusArray.length - 1) ? StatusArray[index + 1] : StatusArray[0] || 'New';
    }

    // --- Table Renderers ---

    function renderTable(selector, headHtml, rowHtmlCallback, data) {
        let i = 1;
        const HeadTable = $(selector + ' thead');
        const BodyTable = $(selector + ' tbody');
        HeadTable.empty().append(headHtml);
        BodyTable.empty();
        $.each(data, function (_, num) {
            BodyTable.append(rowHtmlCallback(num, i++));
        });
    }

    function GetVacancy(data) {
        renderTable('#VacanciesTable',
            '<tr><th width="10px">№</th><th width="80px">Title</th><th width="300px">Description</th><th width="50px">StartDate</th><th width="50px">EndDate</th><th width="20px">Action</th></tr>',
            function (num, i) {
                // Use data-id for easier jQuery targeting
                return `<tr class="editable-row" data-id="${num.Id}" data-target="GetVacancy">
                            <td align="center">${i}</td>
                            <td class="Title">${num.Title}</td>
                            <td class="Description">${num.Description}</td>
                            <td class="StartDate">${formatISODate(num.StartDate)}</td>
                            <td class="EndDate">${formatISODate(num.EndDate)}</td>
                            <td class="Action"><a href="#" class="edit-btn"><i class="fas fa-edit"></i> edit</a></td></tr>`;
            }, data);

        // Populate SelectModel for Vacancy Add/Edit modal
        $('#SelectModel').empty().append('<option selected value="">Select Model...</option>');
        $.each(data, function (_, num) { $('#SelectModel').append('<option>' + num.Title + '</option>'); });
        $('#SelectModel').append('<option>Custom Model</option>');
    }

    function GetHiring(data) {
        console.log(data);
        renderTable('#HiringTable',
            '<tr><th width="10px">№</th><th width="80px">Candidat</th><th width="80px">User</th><th width="80px">Status</th><th width="80px">Vacancy</th><th width="10px">StatusDate</th><th width="200px">Commentary</th></tr>',
            function (num, i) {
                return `<tr class="editable-row" data-id="${num.HiringId}" data-candidat-id="${num.CandidatID}" data-target="GetHiring">
                            <td align="center">${i}</td>
                            <td class="Candidat">${num.Candidat}</td>
                            <td class="Users">${num.User}</td>
                            <td class="Status" data-cv="${num.CV}">${num.Status}</td>
                            <td class="Vacancy">${num.Vacancy}</td>
                            <td class="StatusDate">${formatISODate(num.StatusDate.$date)}</td>
                            <td class="Commentary">${num.Comm} <a href="#" class="edit-btn"><i class="fas fa-edit"></i> edit</a></td></tr>`;
            }, data);
    }

    // NOTE: GetUsers, GetEmployees, GetDictionary renderers should also be updated
    // to use the new HTML structure with data-target and data-id on the <tr>.
    // Function to render the USERS table
    function GetUsers(data) {
        console.log(data);

        renderTable('#UsersTable',
            '<tr><th width="10px">№</th><th width="80px">Username</th><th width="80px">Password</th><th width="80px">FirstName</th><th width="80px">LastName</th><th width="80px">E-mail</th><th width="50px">RoleId</th><th width="80px">StartDate</th><th width="80px">EndDate</th></tr>',
            function (num, i) {
                // Determine if the edit link should be shown (based on role)
                const editLink = role === "Admin" ? ' <a href="#" class="edit-btn"><i class="fas fa-edit"></i> edit</a>' : '';

                return `<tr class="editable-row" data-id="${num.Id}" data-target="GetUsers">
                            <td align="center">${i}</td>
                            <td class="Username">${num.Username}</td>
                            <td class="Password">${num.Password}</td>
                            <td class="FirstName">${num.FirstName}</td>
                            <td class="LastName">${num.LastName}</td>
                            <td class="Email">${num.Email}</td>
                            <td class="RoleID">${num.RoleId}</td>
                            <td class="StartDate">${formatISODate(num.StartDate.$date)}</td>
                            <td class="EndDate">${num.EndDate}${editLink}</td></tr>`;
            }, data);
    }

    // Function to render the EMPLOYEES table
    function GetEmployees(data) {
        renderTable('#EmployeesTable',
            '<tr><th width="10px">№</th><th width="80px">FirstName</th><th width="80px">LastName</th><th width="80px">Phone</th><th width="100px">E-mail</th><th width="50px">Department</th><th width="50px">Position</th><th width="20px">Hiring</th><th width="80px">StartDate</th></tr>',
            function (num, i) {
                const editLink = role === "Admin" ? ' <a href="#" class="edit-btn"><i class="fas fa-edit"></i> edit</a>' : '';

                return `<tr class="editable-row" data-id="${num.Id}" data-target="GetEmployees">
                            <td align="center">${i}</td>
                            <td class="FirstName">${num.FirstName}</td>
                            <td class="LastName">${num.LastName}</td>
                            <td class="Phone">${num.Phone}</td>
                            <td class="Email">${num.Email}</td>
                            <td class="Department">${num.Department}</td>
                            <td class="Position">${num.Position}</td>
                            <td class="Hiring">${num.Hiring}</td>
                            <td class="StartDate">${num.StartDate}${editLink}</td></tr>`;
            }, data);
    }

    // Function to render the DICTIONARY table
    function GetDictionary(data) {
        renderTable('#DictionaryTable',
            '<tr><th width="10px">№</th><th width="80px">Name</th><th width="80px">Type</th><th width="200px">Description</th></tr>',
            function (num, i) {
                const editLink = role === "Admin" ? ' <a href="#" class="edit-btn"><i class="fas fa-edit"></i> edit</a>' : '';
                console.log(editLink);

                return `<tr class="editable-row" data-id="${num._id.$numberDecimal}" data-target="GetDictionary">
                            <td align="center">${i}</td>
                            <td class="Name">${num.Name}</td>
                            <td class="Type">${num.Type}</td>
                            <td class="Description">${num.Description}${editLink}</td></tr>`;
            }, data);
    }
    // --- Navigation & Data Loading (Revised to use new HTML structure) ---

    $('.nav-links').on('click', '.nav-item', function (e) {
        e.preventDefault();

        // Handle UI state (active class is handled in the inline JS block, but re-run for safety)
        $('.nav-item').removeClass('active');
        $(this).addClass('active');

        // Hide/Show tables (Views)
        const targetContent = $(this).data('content');
        const targetView = targetContent + '-view';
        $('.data-view').removeClass('active').addClass('hidden');
        $('#' + targetView).removeClass('hidden').addClass('active');

        // Determine API target
        const apiTargets = {
            'vacancies': 'GetVacancy',
            'hiring': 'GetHiring',
            'employees': 'GetEmployees',
            'dictionary': 'GetDictionary',
            'users': 'GetUsers'
        };

        currentViewTarget = apiTargets[targetContent];

        // Toggle add buttons
        $('.addUser').hide();
        $('.addVacancies').hide();

        if (currentViewTarget === 'GetVacancy') {
            $('.addVacancies').show();
        } else if (currentViewTarget === 'GetUsers' && role === "Admin") {
            $('.addUser').show();
        }

        // Fetch Data
        $.getJSON("/Admin/" + currentViewTarget, { action: "GetComponents", target: currentViewTarget }, function (data) {
            switch (currentViewTarget) {
                case 'GetVacancy': GetVacancy(data); break;
                case 'GetHiring': GetHiring(data); break;
                case 'GetUsers': GetUsers(data); break;
                case 'GetEmployees': GetEmployees(data); break;
                case 'GetDictionary': GetDictionary(data); break;
            }
        });
    });

    // --- CRUD Actions (Centralized and Adapted) ---

    // 1. ADD Button Handler (Global Add New / Contextual Add Vacancy/User)
    $('.addVacancies, .addUser, #add-item-btn').on('click', function () {
        let title = "Add New Item";
        let content = "";
        let actionTarget = "";

        // Determine the context based on the visible view
        const activeViewId = $('#content-view').find('.data-view.active').attr('id');

        if (activeViewId === 'vacancies-view') {
            title = "Add New Vacancy";
            content = templates.vacancyForm;
            actionTarget = 'SetNewVacancy';
        } else if (activeViewId === 'users-view') {
            title = "Add New User";
            content = templates.editUserForm; // Re-use the user form for add
            actionTarget = 'SetNewUser';
        } else {
            alert('Select a category (Vacancies/Users) to use the Add button.');
            return;
        }

        openModal(title, content);

        // Hide Edit/Delete, show Add for the specific form
        $('#EditVacancyButton, #DeleteVacancyButton, #EditUserButton, #DeleteUserButton').hide();
        $('#AddVacancyButton, #AddUserButton').show();
    });

    // 2. EDIT Button Handler (Delegated event for all tables)
    $('#content-view').on('click', '.editable-row .edit-btn', function (e) {
        e.preventDefault();

        const $row = $(this).closest('tr');
        currentItemID = $row.data('id');
        currentViewTarget = $row.data('target'); // e.g., 'GetVacancy'

        let title = "Edit Item";
        let content = "";

        // Show Edit/Delete, hide Add for the specific form
        // NOTE: We only show the buttons relevant to the modal type below, 
        // so we can remove this line for better control:
        // $('#EditVacancyButton, #DeleteVacancyButton, #EditUserButton, #DeleteUserButton').show();
        // $('#AddVacancyButton, #AddUserButton').hide();

        // --- Start: Handle different item types ---
        switch (currentViewTarget) {
            case 'GetVacancy':
                title = "Edit Vacancy";
                content = templates.vacancyForm;
                openModal(title, content);
                $('#EditVacancyButton, #DeleteVacancyButton').show();
                // Fetch data and populate form fields
                // Assuming your backend responds with a JSON object or array of one object
                $.post("/Admin/GetVacancy/EditVacancyMenu", { ID: currentItemID }, function (data) {
                    const d = Array.isArray(data) ? data[0] : (typeof data === 'string' ? JSON.parse(data) : data);

                    $('#VacTitle').val(d.VacancyTitle || d.Title);
                    $('#VacancyDesc').val(d.VacancyDescription || d.Description);
                    // Use formatISODate utility for date parsing
                    $('#SetDate').val(formatISODate(d.EndDate).substring(0, 10));
                    $('#SelectModel').val('');
                });
                break;

            case 'GetHiring':
                title = "Edit Hiring Candidate";
                content = templates.editHiringForm;
                openModal(title, content);

                // Fetch Hiring Data and populate form fields
                $.post("/Admin/GetHiring/EditHiringMenu", { ID: currentItemID }, function (data) {
                    const d = Array.isArray(data) ? data[0] : (typeof data === 'string' ? JSON.parse(data) : data);

                    // Populate fields
                    $('#HiringStatus').val(d.Status);
                    $('#CandidatStatus').text("Next: " + GetNextStatus(d.Status));
                    $('#HiringCommentary').val(d.Comm);
                    // Store CandidatID if needed for further actions
                    CandidatID = d.CandidatID;
                });
                break;

            case 'GetUsers':
                title = "Edit User";
                content = templates.editUserForm;
                openModal(title, content);

                // Fetch User Data and populate form fields
                $.post("/Admin/GetUsers/EditUserMenu", { ID: currentItemID }, function (data) {
                    console.log(data);
                    const d = Array.isArray(data) ? data[0] : (typeof data === 'string' ? JSON.parse(data) : data);

                    // Populate fields
                    $('#UserFirstName').val(d.FirstName);
                    $('#UserLastName').val(d.LastName);
                    $('#UserUsername').val(d.Username);
                    // Password field is usually left blank for security reasons on edit
                    $('#UserPassword').val('');
                    $('#UserEmail').val(d.Email);
                });
                break;

            case 'GetEmployees':
                title = "Edit Employee Record";
                content = templates.editEmployeeForm;
                openModal(title, content);

                // Fetch Employee Data and populate form fields
                $.post("/Admin/GetEmployees/EditEmployeeMenu", { ID: currentItemID }, function (data) {
                    const d = Array.isArray(data) ? data[0] : (typeof data === 'string' ? JSON.parse(data) : data);

                    // Populate fields
                    $('#EmpFirstName').val(d.FirstName);
                    $('#EmpLastName').val(d.LastName);
                    $('#EmpPhone').val(d.Phone);
                    $('#EmpEmail').val(d.Email);
                    $('#EmpDepartment').val(d.Department);
                    $('#EmpPosition').val(d.Position);
                    $('#EmpStartDate').val(formatISODate(d.StartDate).substring(0, 10));
                });
                break;

            case 'GetDictionary':
                title = "Edit Dictionary Item";
                content = templates.editDictionaryForm;
                openModal(title, content);

                // Fetch Dictionary Data and populate form fields
                $.post("/Admin/GetDictionary/EditDictionaryMenu", { ID: currentItemID }, function (data) {
                    const d = Array.isArray(data) ? data[0] : (typeof data === 'string' ? JSON.parse(data) : data);

                    // Populate fields
                    $('#DictName').val(d.Name);
                    $('#DictType').val(d.Type);
                    $('#DictDescription').val(d.Description);
                });
                break;
        }
        // --- End: Handle different item types ---

        // NOTE: The individual Save/Delete buttons for each form (e.g., #EditHiringButton)
        // must also have their own click handlers attached to #global-modal-behind 
        // to complete the CRUD cycle.
    });

    // 3. CRUD LOGIC HANDLERS (Delegated events for buttons inside the modal)

    // A. Vacancy CRUD Handlers (Attach to the Modal container)
    $('#global-modal-behind').on('click', '#EditVacancyButton', function () {
        performActionAndRefresh("/Admin/GetVacancy/EditVacancy", {
            ID: currentItemID,
            Title: $('#VacTitle').val(),
            Description: $('#VacancyDesc').val(),
            EndDate: $('#SetDate').val()
        }, 'GetVacancy');
    });

    $('#global-modal-behind').on('click', '#DeleteVacancyButton', function () {
        if (confirm("Are you sure you want to delete this vacancy?")) {
            performActionAndRefresh("/Admin/GetVacancy/DeleteVacancy", { ID: currentItemID }, 'GetVacancy');
        }
    });

    $('#global-modal-behind').on('click', '#AddVacancyButton', function () {
        performActionAndRefresh("/Admin/GetVacancy/SetNewVacancy", {
            Title: $('#VacTitle').val(),
            Description: $('#VacancyDesc').val(),
            EndDate: $('#SetDate').val()
        }, 'GetVacancy');
    });

    // B. Vacancy Model Selection
    $('#global-modal-behind').on('change', '#SelectModel', function () {
        var val = $(this).val();
        if (val === "Custom Model" || val === "Select Model...") {
            $('#VacTitle, #VacancyDesc').val('');
        } else {
            $.post("/Admin/GetVacancy/getVacancyV", { Title: val }, function (data) {
                $.each(data, function (_, d) {
                    $('#VacTitle').val(d.Title);
                    $('#VacancyDesc').val(d.Description);
                    // Optionally set the end date if the model has one
                });
            });
        }
    });

    // C. User CRUD Handlers (Example, needs corresponding API endpoints)
    $('#global-modal-behind').on('click', '#EditUserButton', function () {
        performActionAndRefresh("/Admin/GetUsers/EditUser", {
            ID: currentItemID,
            FirstName: $('#UserFirstName').val(),
            LastName: $('#UserLastName').val(),
            Username: $('#UserUsername').val(),
            Password: $('#UserPassword').val(), // Careful with security!
            Email: $('#UserEmail').val()
        }, 'GetUsers');
    });

    // D. Hiring Status (Adapt the old logic to the new structure)
    // NOTE: This logic needs to be attached to the 'Edit Hiring' modal content
    $('#global-modal-behind').on('click', '#CandidatStatus', function () {
        var status = GetNextStatus($(this).val());
        $(this).val(status).text(status);
        var colors = { "New": "blue", "Archieved": "yellow", "Rejected": "red", "Hired": "green" };
        $(this).css('background-color', colors[status] || 'lightgreen');
    });
    // D. Edit Dictionary Item
    $('#global-modal-behind').on('click', '#EditDictionaryButton', function () {
        // 1. Gather data from the dictionary edit form fields
        const dictionaryData = {
            ID: currentItemID,
            Name: $('#DictName').val(),
            Type: $('#DictType').val(),
            Description: $('#DictDescription').val()
        };

        // 2. Perform the update action and refresh the 'GetDictionary' view
        performActionAndRefresh("/Admin/GetDictionary/EditDictionary", dictionaryData, 'GetDictionary');
    });

    // E. Delete Dictionary Item
    $('#global-modal-behind').on('click', '#DeleteDictionaryButton', function () {
        if (confirm("WARNING: Are you sure you want to delete this dictionary item? This could affect other records!")) {
            // 1. Send the ID for deletion
            const deleteData = {
                ID: currentItemID
            };

            // 2. Perform the delete action and refresh the 'GetDictionary' view
            performActionAndRefresh("/Admin/GetDictionary/DeleteDictionary", deleteData, 'GetDictionary');
        }
    });

    // F. Add New Dictionary Item
    // NOTE: This assumes you have logic in the main 'Add New' handler 
    // to show the dictionary form and the #AddDictionaryButton.
    $('#global-modal-behind').on('click', '#AddDictionaryButton', function () {
        // 1. Gather data from the dictionary edit form fields
        const dictionaryData = {
            Name: $('#DictName').val(),
            Type: $('#DictType').val(),
            Description: $('#DictDescription').val()
        };

        // 2. Perform the add action and refresh the 'GetDictionary' view
        performActionAndRefresh("/Admin/GetDictionary/SetNewDictionary", dictionaryData, 'GetDictionary');
    });


    // --- Initial Load ---
    $.getJSON("/Admin/GetVacancy", { action: "GetComponents" }, GetVacancy);
    function formatISODate(isoDate, formatType = 'local') {
        let dateString;

        // Handle MongoDB BSON date structure (e.g., { $date: "2023-02-01T00:00:00Z" })
        if (typeof isoDate === 'object' && isoDate !== null && isoDate.hasOwnProperty('$date')) {
            dateString = isoDate.$date;
        } else if (typeof isoDate === 'string') {
            dateString = isoDate;
        } else {
            return 'N/A'; // Or handle error appropriately
        }

        // Attempt to create a Date object
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        if (formatType === 'utc') {
            // Example: 2023-02-01 00:00 UTC
            return date.getUTCFullYear() + '-' +
                String(date.getUTCMonth() + 1).padStart(2, '0') + '-' +
                String(date.getUTCDate()).padStart(2, '0') +
                ' UTC';
        } else {
            // Formats the date based on the user's locale (e.g., 01/02/2023, 02:00:00)
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
    }
});