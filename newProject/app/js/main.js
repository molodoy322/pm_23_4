const ctx = document.getElementById('chart1').getContext("2d");
var gradient1 = ctx.createLinearGradient(0, 0, 0, 175);
   gradient1.addColorStop(0.0, '#fcab11');
   gradient1.addColorStop(1.0, '#f9465b');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [7.5, 2.5],
      backgroundColor: [gradient1, "white"] 
    }]
  },
  
  options: {
    plugins: {
      tooltip: {
        enabled: false // Вимкнути підказку при наведенні
      }
    },
    hover: false,
    cutout: 60,
    borderRadius: 30,
    scales: {
      display: false
    }
  }
});

const ctx2 = document.getElementById('chart2');
new Chart(ctx2, {
  type: 'line',
  data: {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900],
    datasets: [{
      data: [100, 900, 600, 1800, 1600, 2191, 3133],
      borderColor: [gradient1],
      backgroundColor: [gradient1],
      fill: false
  }]},
  
  options: {
    plugins: {
      legend: {
        display: false // Приховати заголовок
      }
    },
    scales: {
      x: {
        display: false
      },
      y: {
        display: true,
        title: {
          display: false
        },
        ticks: {
          display: false,
        }
      }
    },
    title: {
      display: false
    }
  }
});