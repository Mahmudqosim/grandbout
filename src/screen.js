export function checkScreenOrientation() {
  const current_mode = screen.orientation.type

  insertModal()

  if (
    current_mode === "landscape-primary" ||
    current_mode === "landscape-secondary"
  )
    return

  document.getElementById("modal").classList.add("active")
}

screen.orientation.addEventListener("change", function () {
  const current_mode = screen.orientation.type

  if (
    current_mode === "landscape-primary" ||
    current_mode === "landscape-secondary"
  ) {
    document.getElementById("modal").classList.remove("active")
    return
  }

  document.getElementById("modal").classList.add("active")
})

function insertModal() {
  document.body.insertAdjacentHTML(
    "beforebegin",
    `
    <div id="modal">
      <div id="notification">
        <h1>Invalid Orientation</h1>
        <p>
          Rotate or get your device into landscape mode to continue.
        </p>
      </div>
    </div>
  `
  )
}
