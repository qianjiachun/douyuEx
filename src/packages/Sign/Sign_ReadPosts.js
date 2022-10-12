async function initPkg_Sign_ReadPosts() {
	const counts = 5;
  for (let i = 0; i < counts; i++) {
    await readPosts();
		await sleep(2000);
  }
}

function readPosts() {
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://yuba.douyu.com/wbapi/web/post/detail/555691541586843641?cid=&timestamp=" + new Date().getTime(),
		responseType: "json",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
      "dy-token": dyToken,
      "dy-client": "pc"
		},
		onload: function(response) {
		}
	});
}