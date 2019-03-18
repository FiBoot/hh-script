// ==UserScript==
// @name         HH v2
// @namespace    http://tampermonkey.net/
// @version      0.2
// @author       FiBoot
// @match        https://www.hentaiheroes.com
// @grant        none
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==
(function() {
  D = {
    // LISTE DES FILLES
    g_list: [],
    //
    timespan: 10,
    c_list: ['sado', 'charm', 'tech'],
    content_open: true,
    g_requested: 0,
    total: 0
  };

  f_list = [
    { name: 'Dark Lord' },
    { name: 'Espion Ninja' },
    { name: 'Gruntt' },
    { name: 'Edwarda' },
    { name: 'Donatien' },
    { name: 'Silvanus' },
    { name: 'Bremen' },
    { name: 'Finalmecia' },
    { name: 'Roko' },
    { name: 'Karole' }
  ];

  link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css';
  $('head')[0].appendChild(link);

  /* CONTENT */
  content_button_style = 'position: fixed; bottom: 0; left: 0;';
  content_button = $(
    `<button class="btn btn-default" style="${content_button_style}"><span class="glyphicon glyphicon-chevron-down"></span></button>`
  );
  $('body').append(content_button);
  content_style =
    'position:fixed; bottom:35px; left:0; padding:10px; border:1px solid #CCC; border-radius:4px; background-color:rgba(200,200,200,0.9)';
  content = $(`<div style="${content_style}"></div>`);
  $('body').append(content);

  content_button.click(function() {
    if (D.content_open) {
      $(this)
        .find('span')
        .removeClass('glyphicon glyphicon-chevron-down');
      $(this)
        .find('span')
        .addClass('glyphicon glyphicon-chevron-up');
      content.hide();
      D.content_open = false;
    } else {
      $(this)
        .find('span')
        .removeClass('glyphicon glyphicon-chevron-up');
      $(this)
        .find('span')
        .addClass('glyphicon glyphicon-chevron-down');
      content.show();
      D.content_open = true;
    }
  });

  /* R */
  r_button = $(`<button type="button" class="btn btn-default">Reload</button>`);
  r_button.click(e => {
    r_button.addClass('disabled');
    location.reload();
  });

  /* P */
  row = $('<div class="row" style="margin-bottom: 10px"></div>');
  p_button = $(`<button type="button" class="btn btn-success">Pognon</button>`);
  p_button.click(e => {
    if (!D.g_list.length) {
      D.g_list = getGirl();
    }
    if (D.g_list.length) {
      p_feedback.val('fetchin G list...');
      p_button.addClass('disabled');
      D.g_requested = 0;
      D.total = 0;
      getGData(0);
    } else {
      p_feedback.val('no girl found');
    }
  });
  row.append($(`<div class="col-xs-2"></div>`).append(p_button));
  row.append($(`<div class="col-xs-2"></div>`).append(r_button));
  p_feedback = $(`<input type="text" class="form-control" disabled="disabled">`);
  row.append($(`<div class="col-xs-8"></div>`).append(p_feedback));
  content.append(row);

  function getGData(index) {
    if (index < D.g_list.length) {
      console.log(`requesting g[${D.g_list[index]}]`);
      $.ajax({
        type: 'POST',
        url: 'https://www.hentaiheroes.com/ajax.php',
        data: `class=Girl&which=${D.g_list[index]}&action=get_salary`
      }).done(function(response) {
        if (response.success) {
          D.total += response.money;
        }
        D.g_requested += 1;
        if (D.g_requested === D.g_list.length) {
          p_feedback.val(`${D.total} retreived`);
          p_button.removeClass('disabled');
        } else {
          const percent = Math.round((D.g_requested / D.g_list.length) * 10000) / 100;
          p_feedback.val(`${percent}% (${D.g_requested} on ${D.g_list.length})`);
        }
      });
      setTimeout(function() {
        getGData(index + 1);
      }, D.timespan);
    }
  }
  function getGirl() {
    g_list = [];
    $('#hh_game')
      .contents()
      .find('.girls_list')
      .find('div[id_girl]')
      .each(function(i, e) {
        g_list.push(parseInt($(e).attr('id_girl')));
      });
    console.info(g_list);
    return g_list;
  }

  /* F */
  row = $('<div class="row" style="margin-bottom: 10px"></div>');
  f_select = $(`<select class="form-control"></select>`);
  for (i = 0; i < f_list.length; i++) {
    option = $(`<option value="${i + 1}">${i + 1}: ${f_list[i].name}</option>`);
    f_select.append(option);
  }
  row.append($(`<div class="col-xs-4"></div>`).append(f_select));
  f_button = $(`<button type="button" class="btn btn-warning">Fight</button>`);
  row.append($(`<div class="col-xs-2"></div>`).append(f_button));
  f_feedback = $(`<input type="text" class="form-control" disabled="disabled">`);
  row.append($(`<div class="col-xs-6"></div>`).append(f_feedback));
  content.append(row);
  f_select.val(f_list.length);

  f_button.click(e => {
    f_feedback.val(`fighting ${f_list[f_select.val() - 1].name} ...`);
    f_button.addClass('disabled');
    $.ajax({
      type: 'POST',
      url: 'https://www.hentaiheroes.com/ajax.php',
      data: `class=Battle&action=fight&who[id_troll]=${f_select.val()}&who[id_world]${f_select.val() +
        1}`
    }).done(function(response) {
      f_feedback.val(`Fight ${response.success ? `won` : `fail`}`);
      f_button.removeClass('disabled');
    });
  });

  /* C */
  row = $('<div class="row" style="margin-bottom: 10px"></div>');
  c_select = $(`<select class="form-control"></select>`);
  for (i = 0; i < 3; i++) {
    c_select.append(`<option value="${i + 1}">${D.c_list[i]}</option>`);
  }
  row.append($(`<div class="col-xs-2"></div>`).append(c_select));
  c_number = $(`<input type="number" class="form-control" value="1">`);
  row.append($(`<div class="col-xs-2"></div>`).append(c_number));
  c_button = $(`<button type="button" class="btn btn-info">Stat+</button>`);
  c_button.click(e => {
    c_button.addClass('disabled');
    c_feedback.val(`Rising stat ...`);
    upStat(c_number.val(), c_select.val());
  });
  row.append($(`<div class="col-xs-2"></div>`).append(c_button));
  c_feedback = $(`<input type="text" class="form-control" disabled="disabled">`);
  row.append($(`<div class="col-xs-6"></div>`).append(c_feedback));
  content.append(row);

  function upStat(count, stat) {
    if (count < 0) {
      return c_button.removeClass('disabled');
    }
    $.ajax({
      type: 'POST',
      url: 'https://www.hentaiheroes.com/ajax.php',
      data: `class=Hero&carac=${stat}&action=pay_up_carac`
    }).done(function(response) {
      if (!response.success) {
        c_feedback.val('Stat failed');
        return c_button.removeClass('disabled');
      }
      c_feedback.val(
        `Stat ${D.c_list[stat - 1]} rised to ${response[`carac${stat}`]}${
          count ? ` [${count} to go..]` : ''
        }`
      );
      setTimeout(function() {
        upStat(count - 1, stat);
      }, D.timespan);
    });
  }

  // init
  p_button.trigger('click');
})();
