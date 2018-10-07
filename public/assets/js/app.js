$(() => {
  let socket = io.connect('http://127.0.0.1:8090');
  let cmd_in_progress = false;

  let cursor__ = $('<span>');
  cursor__.addClass('__cursor__').text('█');

  socket.on('connect', data => {
    console.log('API, Connected.');
  });

  socket.on('cmd_', data => {
    cmd_in_progress = false;

    let screen__ = $('#screen');

    let line_ = $('<div>');
    line_.addClass('line__');
    line_.addClass('active');

    content_ = $('<p>');
    content_.addClass('font');
    content_.html(
      `gesut@ekoapp:~$&nbsp;<span class="shell_out__"></span><span class="__cursor__" style="display: none;">█</span>`
    );


    $('.reply_line_.active').html(data.message);

    line_.append(content_);
    screen__.append(line_).scrollTop(99999);
  });

  $(document).keypress(e => {
    if (cmd_in_progress) {
      return;
    }

    let active_input = $('.line__.active').find('.shell_out__');

    let content__ = active_input.text() + String.fromCharCode(e.charCode);

    active_input.text(content__);
  });

  $(document).keydown(e => {
    let shell__ = $('.line__.active').find('.shell_out__');

    if (e.keyCode == 8) {
      shell__.text(shell__.text().substring(0, shell__.text().length - 1));
      return;
    }

    if (e.keyCode == 76 && e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();

      $('.line__:not(.active)').remove();
      $('.reply_line_').remove();
    }
  });

  $(document).keyup(e => {
    if (cmd_in_progress) {
      return;
    }

    if (e.keyCode == 13) {
      cmd_in_progress = true;

      let cmdContent = $('.line__.active').find('.shell_out__').text()

      $('.reply_line_.active').removeClass('active');

      let replyLine = $('<p>');
      replyLine.addClass('reply_line_ active');

      replyLine.append(cursor__);


      $('.line__.active').find('.__cursor__').remove();
      $('.line__').removeClass('active');
      $('#screen').append(replyLine);

      socket.emit('_cmd', { message: cmdContent });
    }
  });

  setInterval(() => {
    $('.line__.active')
      .find('.__cursor__')
      .toggle();
  }, 250);
});
