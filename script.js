// Fade animation
const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    let position = el.getBoundingClientRect().top;
    if (position < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});

let chart;

function calculate() {
  let km = parseFloat(document.getElementById("km").value);
  let petrol = parseFloat(document.getElementById("petrol").value);
  let electric = parseFloat(document.getElementById("electric").value);
  let mileage = parseFloat(document.getElementById("mileage").value);

  if (isNaN(km) || isNaN(petrol) || isNaN(electric) || isNaN(mileage)) {
    alert("Fill all fields");
    return;
  }

  let petrolCost = (km / mileage) * petrol * 30;
  let evCost = (km / 6) * electric * 30;
  let savings = petrolCost - evCost;

  document.getElementById("p1").innerText = "⛽ Petrol: ₹" + petrolCost.toFixed(0);
  document.getElementById("p2").innerText = "⚡ EV: ₹" + evCost.toFixed(0);
  document.getElementById("p3").innerText = "💰 Savings: ₹" + savings.toFixed(0);

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: ["Petrol", "EV"],
      datasets: [{
        label: "Monthly Cost ₹",
        data: [petrolCost, evCost]
      }]
    }
  });
}
