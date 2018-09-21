!(function(){
    var userList = {};
    var vList = [];
    axios.get('/api/folders').then(function(res) {
        if (res.data && res.data.code === 200) {
            var reg = /^([\w-]+)-(\d+)$/;
            var files = res.data.files;
            files.forEach(function(item) {
                var match = item.match(reg);
                if (match) {
                    userList[match[1]] = true;
                    vList.push(item);
                }
            });
            renderUserSelect(userList, vList);
            getCurrentVersion(Object.keys(userList)[0]);
        }
    })

    function renderUserSelect(userList) {
        var userOptions = '';
        for(var k in userList) {
            userOptions += '<option value="' + k + '">' + k + '</option>';
        }
        document.getElementById('username').innerHTML = userOptions;
    }

    function renderVersionSelect(vList, currentVersion) {
        var vOptions = '';
        for(var i = 0; i < vList.length; i++) {
            if (currentVersion === vList[i]) {
                vOptions += '<option selected value="' + vList[i] + '">' + vList[i] + '*</option>';
            } else {
                vOptions += '<option value="' + vList[i] + '">' + vList[i] + '</option>';
            }
        }
        document.getElementById('version').innerHTML = vOptions;
    }

    function submit() {
        var username = document.getElementById('username').value;
        var version = document.getElementById('version').value;
        modifyNginxConf(username, version);
    }

    function modifyNginxConf(username, version) {
        axios.get('http://jenkins.luoyeshu.com/job/modify-jenkins-conf/buildWithParameters?token=luoyeshu&username=' + username + '&version=' + version).then(function() {
            alert('success');
        }, function() {
            alert('error');
        });
    }

    function getCurrentVersion(username) {
        axios.get('/api/getCurrentVersion?username=' + username).then(function(res) {
            console.log(res.data);
            if (res.data && res.data.code === 200) {
                var match = res.data.str.match(/[\w-]+-\d+/);
                if (match) {
                    renderVersionSelect(vList, match[0]);
                }
            }
        })
    }

    document.getElementById('switch').addEventListener('click', submit, false);
    document.getElementById('username').addEventListener('change', function(e) {
        getCurrentVersion(e.target.value);
    }, false);
})();
