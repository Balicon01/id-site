<!DOCTYPE html>
<html lang="ru">

<head>
  <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
  <meta charset="utf-8">
  <title>ID Eternal RP</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.css" />
  <style>
    body {
      margin: 0;
      width: auto;
      font-family: Arial, Helvetica, sans-serif;
    }

    .topnav {
      overflow: hidden;
      background-color: #333;
      padding: 10px;
    }

    .topnav .btn {
      margin-right: 10px;
    }

    .topnav input {
      max-width: 300px;
    }

    header {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 88px;
      z-index: 10;
      background: #eeeeee;
      box-shadow: 0 7px 8px rgba(0, 0, 0, 0.12);
    }

    .base_dataTable {
      margin-top: 100px;
      padding: 20px;
    }
  </style>
</head>

<body>
  <header>
    <div class="topnav text-white d-flex align-items-center">
      <button type="button" class="btn btn-primary btn-lg" id="relsi" autocomplete="off">
        Base Eternal
      </button>
      <button type="button" class="btn btn-secondary btn-lg" id="relorig" autocomplete="off">
        Original
      </button>
      <div class="form-group ms-auto">
        <input type="text" class="form-control" id="search" placeholder="Поиск по таблице">
      </div>
    </div>
  </header>

  <div class="base_dataTable">
    <table id="display_json_data" class="table table-bordered table-striped table-vcenter dataTable">
      <thead>
        <tr>
          <th>Photo</th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody id="dataTable"></tbody>
    </table>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(function () {
      // Привязка кнопок
      $('#relsi, #relorig').click(function () {
        Reload('https://Balicon01.github.io/3412516593.json');
      });

      // Функция загрузки данных
      function Reload(path) {
        $.getJSON(path)
          .done(function (data) {
            let allRecordsHTML = '';
            data.forEach(item => {
              // Фильтрация типов
              if (["Object", "Vehicle", "Effect", "Large", "Medium", "Decal"].includes(item.Type)) return;

              // Добавление строки в таблицу
              allRecordsHTML += `<tr>
                <td>
                  <img height="50" class="image" 
                    src="https://Balicon01.github.io/images/${item.ID}.png" 
                    onerror="this.style.display='none'" 
                    alt="No Image">
                </td>
                <td>${item.ID}</td>
                <td>${item.Name}</td>
                <td>${item.Description || "Нет описания"}</td>
              </tr>`;
            });
            $('#dataTable').html(allRecordsHTML);
          })
          .fail(function () {
            console.error("Не удалось загрузить данные JSON.");
            alert('Ошибка загрузки данных. Пожалуйста, попробуйте позже.');
          });
      }

      // Реализация поиска
      $('#search').on('keyup', function () {
        const searchValue = $(this).val().toLowerCase();
        $('#dataTable tr').filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
        });
      });
    });
  </script>
</body>

</html>
