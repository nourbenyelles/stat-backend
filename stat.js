import React, { useRef, useEffect, useState } from 'react';
import { Chart, CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Title } from 'chart.js/auto';
Chart.register(CategoryScale, LinearScale, BarController, BarElement, LineController, LineElement, PointElement, Title);

function Stat() {
  const chartRef = useRef(null);
  const ageChartRef = useRef(null);
  const [specialiteData, setSpecialiteData] = useState(null);
  const [ageData, setAgeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Récupérer les données de spécialité
      const specialiteResponse = await fetch('http://localhost:8081/api/specialite');
      const specialiteJson = await specialiteResponse.json();

      // Multiplier les valeurs par 5
      const specialiteDataMultiplied = {
        labels: specialiteJson.labels,
        data: specialiteJson.data.map(value => value * 5)
      };

      setSpecialiteData(specialiteDataMultiplied);

      // Récupérer les données d'âge
      const ageResponse = await fetch('http://localhost:8081/api/age');
      const ageJson = await ageResponse.json();

      // Multiplier les valeurs par 5
      const ageDataMultiplied = {
        labels: ageJson.labels,
        data: ageJson.data.map(value => value * 5)
      };

      setAgeData(ageDataMultiplied);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Vérifier si les données ont été récupérées
    if (specialiteData && ageData) {
      const chartNode = chartRef.current;
      const ageChartNode = ageChartRef.current;

      if (chartNode && ageChartNode) {
        const chart = new Chart(chartNode, {
          type: 'bar', // Utiliser le type 'bar'
          data: {
            labels: ['Administratif','Affaire','Famille','Immobilier','pénal','Propriété intelectuelle','Sociale'],
            datasets: [
              {
                data: specialiteData.data,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function (value) {
                    return value + '%';
                  },
                },
              },
            },
            plugins: {
              title: {
                display: true,
                text: ' Nos Spécialités  ',
                position: 'bottom',
                font: {
                  size: 18,
                },
              },
            },
          },
        });

        const ageChart = new Chart(ageChartNode, {
          type: 'line', // Utiliser le type 'line'
          data: {
            labels: ageData.labels,
            datasets: [
              {
                data: ageData.data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                },
                ],
                },
                options: {
                scales: {
                y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                callback: function (value) {
                return value + '%';
                },
                },
                },
                },
                plugins: {
                title: {
                display: true,
                text: "L'Âge de nos Avocats",
                position: 'bottom',
                font: {
                size: 18,
                },
                },
                tooltip: {
                callbacks: {
                label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                label += ': ';
                }
                if (context.parsed.y !== null) {
                label += context.parsed.y.toFixed(2) + '%';
                }
                return label;
                },
                },
                },
                },
                },
                });
                return () => {
                  chart.destroy();
                  ageChart.destroy();
                };
              }
            }
          }, [specialiteData, ageData]);

          return (
          <div>
          <div style={{ width: '50%', height: '400px', display: 'inline-block' }}>
          <canvas ref={chartRef}></canvas>
          </div>
          <div style={{ width: '50%', height: '400px', display: 'inline-block' }}>
          <canvas ref={ageChartRef}></canvas>
          </div>
          </div>
          );
          }
          
          export default Stat;
                
