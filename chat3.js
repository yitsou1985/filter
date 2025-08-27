document.addEventListener("DOMContentLoaded", function() {
      let originalContent = "";   
      let filteredLines = [];

      const fileContentEl = document.getElementById('fileContent');
      const searchInputEl = document.getElementById('searchInput');
      const quickSelectEl = document.getElementById('quickSelect');

      // Lecture du fichier
      document.getElementById('fileInput').addEventListener('change', function(event) {
          const file = event.target.files[0];
          if (file) {
              const reader = new FileReader();
              reader.onload = function(e) {
                  originalContent = e.target.result;
                  fileContentEl.textContent = originalContent;
                  filteredLines = originalContent.split('\n');
              };
              reader.readAsText(file);
          }
      });
      
 document.getElementById("clearBtn").addEventListener("click", function () {
      document.getElementById("searchInput").value = "";
    });

      // Filtrage automatique en tapant
      function applyFilter() {
          const filter = searchInputEl.value.toLowerCase();
          const lines = originalContent.split('\n');
          filteredLines = lines.filter(line => line.toLowerCase().includes(filter));
          fileContentEl.textContent = filteredLines.join('\n');
      }

      searchInputEl.addEventListener('input', applyFilter);

      // Ajouter mot-clé depuis sélection
      quickSelectEl.addEventListener('change', function() {
          const value = this.value;
          if (value) {
              if (searchInputEl.value) {
                  // ajouter avec espace si déjà du texte
                  searchInputEl.value += " " + value;
              } else {
                  searchInputEl.value = value;
              }
              applyFilter(); // appliquer le filtre automatiquement
              this.selectedIndex = 0; // remettre à "--Choisir--"
          }
      });

      // Bouton Original
      document.getElementById('btnOriginal').addEventListener('click', function() {
          fileContentEl.textContent = originalContent;
          searchInputEl.value = "";
      });

      // Bouton Télécharger filtré
      document.getElementById('btnDownload').addEventListener('click', function() {
          if (!filteredLines.length) return alert("Rien à télécharger !");
          const blob = new Blob([filteredLines.join('\n')], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = "fichier_filtré.txt";
          a.click();
          URL.revokeObjectURL(url);
      });

  });