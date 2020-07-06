function initPkg_ExIcon() {
	initPkg_ExIcon_insertDom();
	initPkg_ExIcon_Func();
}
function initPkg_ExIcon_insertDom() {
	let a = document.createElement("div");
	a.className = "ex-icon";
	a.innerHTML = '<a title="～ (´• ᵕ •`)*✲"><svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><image width="24" height="24" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABdFBMVEUAAAAzNjozNjozNjoz NjozNjozNjozNjozNjozNjozNjozNjozNjo0NjpCMjY0NjozNjozNjo9MzczNjozNjo4NThBMjZR U1eusLHQ0dKWmJozNjozNjpTVVl3eXxWWVxnaWyDhYi+v8BWWFzf3+AzNjptb3L09PTv7++Fh4ro 6OlER0rGx8iGh4pOUVQ+QUVXWVyWmJkzNjpxc3bZ2tv39/fX19jHyMnf4OBSVVg+QUWPkZOPkJM5 PEDo6Oja2tthZGeXmJrp6epTVVg0NzttcHKMjY+cnp+Ehog0NztjKSx7IyWIHyF1JCd8IiSpFRfN DAzWCQlmKCt+IiTEDg/UCgq5EhJ+ISTJDQ2WGxyjFxhaLC/SCgp2JCZJMDM8MzdQLjGFICJiKSx1 JCbPCwvFDg56IyVKMDOqq61rbXDNzs+2EhNOLzJrJypRLjE5NTg2OT2Ympw4NTheKy5PLzI5PED+ /v7////d3t/39/f8/Pz5+vpEN+40AAAASnRSTlMAAxorEg1Al7e/swd55v7QI4356Fvz/v7+/f4C Ff7+/v79/f7+Cf7+/v39/f39/v7+/ND8/f7+/v7++P398/79/fz9/uX9/f390Kmu6iUAAAABYktH RHdGZPnXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AUdCCsAU/Ff1wAAAWNJREFUKM9j YCAIGJmYmVkYMYRZ2dg5ODm52Nm4UYV5ePm8vH18fL34+HlYEeICgkJ+/gGBQBDgHyQkyAJXLygc HBIaCAahYcHCIjA9PELBgUggXJQHqoHXLwTIj4j084uKADJConkhWtjE/IHmxMTGxccnxMYATUvk YwO7nz0JaG9ErLiEpKSUeHJKYGCqF7s0UIKJIw2oPzJdIiMzM0siLhvI8eMAmcXMmZObm5uXL5lZ UFAoWVQM5JRwyoAlZOXk5ORLIRKlCkCOLFiChUuxrLxcSVkqq7CwQkpZpby8TJFLFWy5mnp5uYYm xHLNyvJyLTWw5Qxs2jpV5eXVunr6+ga61eXlVYbaYOcycBsZm5SXl5uamZtbmAIZJpZG0CDmsbIu RwI2tjyIQLSxq4KIVtnbIAKRgUXE1sHRCei2MidHZ1sRVeSIctF2dXN393DV9kSOKNxRCwLSrDIy qtKEEw0AQgtYsEqTgPQAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDUtMjlUMDg6NDM6MDArMDA6 MDA6vG69AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTA1LTI5VDA4OjQzOjAwKzAwOjAwS+HWAQAA AABJRU5ErkJggg=="/></svg><i id="ex-icon__tip" class="ex-panel__tip"></i></a>';
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}
function initPkg_ExIcon_Func() {
	document.getElementsByClassName("ex-icon")[0].addEventListener("click", showExPanel);
}

function ExIcon_showTip(a) {
	let d = document.getElementById("ex-icon__tip");
	if (a == true) {
		d.style.display = "block";
	} else {
		d.style.display = "none";
	}
}