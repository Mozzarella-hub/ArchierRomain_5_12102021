// get order Id avec URL
function idRecuperation() {
	let url = new URL(window.location.href);
	let searchParams = new URLSearchParams(url.search);
	if (searchParams.has("id")) {
		let id = searchParams.get("id");
		return id;
	} else {
		console.log("Erreur, pas order Id trouvé");
	}
}
window.addEventListener("load", () => {
	const orderId = document.getElementById("orderId");
	orderId.innerText = idRecuperation();
	localStorage.clear();
});