console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let pages = [
// 	{url:".", title:"Home"},
// 	{url:"projects", title:"Projects"},
// 	{url:"contact", title:"Contacts"},
// 	{url:"https://github.com/ashi-kamra?tab=repositories", title:"Github"},
// ]

// let nav = document.createElement("nav");
// document.body.prepend(nav)

// // const ARE_WE_HOME = document.documentElement.classList.contains("home"); //documentElement = root <html> element

// for (let p of pages){
// 	let url = p.url
// 	let title = p.title
// 	// if (!ARE_WE_HOME && !url.startsWith("http")) {
// 	// 	url = "../" + url;
// 	// }
// 	//nav.insertAdjacentHTML("beforeend", `<a href="${ url }">${ title }</a>`);
// 	let a = document.createElement("a");
// 	a.href = url;
// 	a.textContent = title;
// 	nav.append(a)
// 	if (a.host === location.host && a.pathname === location.pathname){
// 		a.classList.add("current");
// 	} if (a.host !== location.host) { //if external links!
// 		a.target = "_blank";
// 	}
// }

//adding color theme selector
// document.body.insertAdjacentHTML("afterbegin",` 
// 	<label class="color-scheme">
// 		Theme:
// 		<select>
// 			<option value="light dark">Auto</option>
// 			<option value="light">Light</option>
// 			<option value="dark">Dark</option>
// 		</select>
// 	</label>`
// );

// let select = document.querySelector("select");
// select.addEventListener("input", function (event) {
// 	console.log("color scheme changed to", event.target.value);
// 	document.documentElement.style.setProperty("color-scheme", event.target.value);
// 	localStorage.colorScheme = event.target.value;
// }); //functionality for color-scheme, and make sure it saves after reload


// if (localStorage.colorScheme) {
// 	document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
// 	select.value = localStorage.colorScheme;
// }
