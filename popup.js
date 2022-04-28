const list  = document.getElementById('list');
 
window.onload = () => {
  chrome.storage.sync.get(["data"], function({data}) {
    console.log(data);
    list.innerHTML = data.map(i => `<li>${i}</li>`).join('');
  });
};

document.getElementById("sbmt").onclick = function() {
  const d = document.getElementById("curURL").innerHTML + " - " + document.getElementById("newPhrase").value;
  chrome.storage.sync.get(["data"], function({data}) {
    // data.push(d)
    chrome.storage.sync.set({data: [...data,d]}, function() {
    });
    list.innerHTML = data.map(i => `<li>${i}</li>`).join('');
  });
  window.location.reload();
};

document.getElementById("clear").onclick = function() {
  chrome.storage.sync.get(["data"], function({data}) {
    // data.push(d)
    chrome.storage.sync.set({data: []}, function() {
    });
    list.innerHTML = data.map(i => `<li>${i}</li>`).join('');
  });
  window.location.reload();
}

function getHostName(url) {
	var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
		var hostname = match[2].split(".");
		return hostname[0];
	}
	else {
		return null;
	}
}

function get_domain_from_url(url) {
  var a = document.createElement('a').
  a.setAttribute('href', url);
  return a.hostname;
}

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  document.getElementById("curURL").innerHTML = tabs[0].url.replace(/.+\/\/|www.|\..+/g, '');
  // use `url` here inside the callback because it's asynchronous!
});


chrome.storage.sync.get("phrase", ({ phrase }) => {
  document.getElementById("thephrase").innerHTML = document.getElementById("curURL").innerHTML + " - " +phrase;
});