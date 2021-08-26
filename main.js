(function(){
  var labels = [],
    values = [];

  function makeChart (){
    var ctx = document.getElementById('stateChart').getContext('2d');
    ctx.height = 300;
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'População',
                data: values,
                backgroundColor: 'rgb(7 71 166)',
                borderColor: 'rgb(7 71 166)',
                borderWidth: 1
            }]
        },
        options: {
          maintainAspectRatio: false,
        }
    });
  }

  function addRows (data){
    const table = document.getElementById('table');
    let i = 0;

    for (const item of data) {
      labels[i] = item.Year;
      values[i] = parseFloat(item.Population);

      let row = document.createElement('tr');
      row.innerHTML = '';
      row.innerHTML += '<td>'+item.Year+'</td>';
      row.innerHTML += '<td>'+parseFloat(item.Population).toLocaleString('pt-BR')+'</td>';
      row.innerHTML += '<td>'+item.Nation+'</td>';
      row.innerHTML += '<td>'+item["ID Nation"]+'</td>';

      table.appendChild(row);
      i++;
    }

    makeChart ();
  }

  fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
    .then(function(res){
        return res.ok ? res.json() : Promise.reject(res);
    }).then(function (data) {
      addRows(data.data);
    }).catch(function (err) {
      console.warn('Erro.', err);
    });

})();
