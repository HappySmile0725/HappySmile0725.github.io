$(document).ready(function() {
  users = []
  repos = []
  $(".ghbtn").each( function () {
    var repo = $(this).attr('repo');
    if (!repo) {
      return;
    }
    repos.push(repo);
    var user = repo.split('/')[0];
    if (users.indexOf(user) === -1) {
      users.push(user)
    }
  })
  // console.log(1, users, repos)
  for (var i = 0; i < users.length; i++) {
    $.ajax({
    type: "GET",
    url: "https://api.github.com/users/" + users[i] + "/repos?per_page=100",
    tryCount : 0,
    retryLimit : 3,
    async: true,
    dataType: "json",
    success: function (data) {
      for  (var i = 0; i < data.length; i++) {
        if (repos.indexOf(data[i].full_name) !== -1) {
          var fullName = data[i].full_name;
          $("div[repo='" + fullName + "']").children(".star").html('<i class="fa fa-star"></i> ' + data[i].stargazers_count)
          $("div[repo='" + fullName + "']").children(".fork").html('<i class="fa fa-code-fork"></i> ' + data[i].forks_count)
        }
      }
    }
  })}
});
