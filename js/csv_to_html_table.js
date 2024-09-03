CsvToHtmlTable = {
  init: function (csv_path, id) {
    // 获取 input 标签和 output 标签
    const output = document.getElementById(id);

    // 读取文件
    // 当文件读取完成时执行
    $.when($.get(csv_path)).then(
      function (csv_data) {
        // 解析 CSV 文件
        console.log(csv_data);
        //const csv = csv_data.result;
        const lines = csv_data.split('\r\n');
        const headers = lines[0].split(',');
        console.log(headers);
        const data = lines.slice(1).map(line => line.split(','));

        // 渲染表格
        output.innerHTML = `<thead>
                    <tr>
                        <th colspan="`+ headers.length + `">` + document.getElementById('title').innerHTML + `</th>
                    </tr>
                </thead>
              <thead>
                <tr>
                  ${headers.map(header => `<th>${header}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${data.map(row => `
                  <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                  </tr>
                `).join('')}
                <tr><th colspan="`+ headers.length + `">如有问题或获取最新数据请加QQ群563640411</th></tr>
              </tbody>
            `;
      });
    document.getElementById('save').addEventListener('click', function () {
      var node = document.getElementById(id);
      const width = node.offsetWidth
      const height = node.offsetHeight + 30
      domtoimage.toPng(node, {
        backgroundColor: 'transparent',
        getFontFaces: true,
        width: width,
        height: height,
        pixelRatio: 1,
        quility: 1
      })
        .then(function (dataUrl) {
          // 创建一个a标签下载图片
          var link = document.createElement('a');
          link.href = dataUrl;
          link.download = document.getElementById('title').innerHTML + '.png';
          document.body.appendChild(link);
          var event = new MouseEvent('click')           // 模拟鼠标click点击事件
          link.dispatchEvent(event)                        // 触发鼠标点击事件
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        })
    });
  }
};