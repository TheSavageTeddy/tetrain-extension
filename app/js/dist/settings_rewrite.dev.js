"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function hidemenu() {
  m = document.getElementById("menu-items");
  m.style.display = "none";
}

function keydown(ev) {
  switch (ev.keyCode) {
    case 37:
      goBack();
  }
}

function goBack() {
  hidemenu();
  window.location.replace("../../popup.html");
}

function customKeys() {
  hidemenu();
  window.location.replace("../html/customkeys.html");
}

function customTextures() {
  hidemenu();
  window.location.replace("../html/custom_textures.html");
}

function createEnableDisable(select_element, local_name) {
  var select_node = document.getElementById(select_element);
  var en = document.createElement("option");
  var dis = document.createElement("option");
  en.text = "Enabled";
  en.value = "enabled";
  dis.text = "Disabled";
  dis.value = "disabled";
  chrome.storage.local.get([local_name], function (local_config) {
    if (local_config[local_name]) {
      select_node.appendChild(en);
      select_node.appendChild(dis);
    } else {
      select_node.appendChild(dis);
      select_node.appendChild(en);
    }
  });
}

function createExperimentalEnableDisable(select_element, local_name) {
  var select_node = document.getElementById(select_element);
  var en = document.createElement("option");
  var dis = document.createElement("option");
  var exp = document.createElement("option");
  en.text = "Enabled";
  en.value = "enabled";
  dis.text = "Disabled";
  dis.value = "disabled";
  exp.text = "(Experimental)";
  exp.value = "exp";
  exp.disabled = true;
  chrome.storage.local.get([local_name], function (local_config) {
    if (local_config[local_name]) {
      select_node.appendChild(en);
      select_node.appendChild(dis);
      select_node.appendChild(exp);
    } else {
      select_node.appendChild(dis);
      select_node.appendChild(en);
      select_node.appendChild(exp);
    }
  });
}

function createMultiOption(select_element, local_name, options) {
  var select_node = document.getElementById(select_element);
  var options_dict = {};
  var options_list = [];

  for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    options_dict[key] = document.createElement("option");
    options_dict[key].text = key;
    options_dict[key].value = value;
  }

  ;
  chrome.storage.local.get([local_name], function (local_config) {
    for (var _i2 = 0, _Object$entries2 = Object.entries(options_dict); _i2 < _Object$entries2.length; _i2++) {
      var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
          key = _Object$entries2$_i[0],
          value = _Object$entries2$_i[1];

      if (value.value == local_config[local_name]) {
        select_node.appendChild(options_dict[key]);
      } else {
        options_list.push(options_dict[key]);
      }
    }

    for (var _i3 = 0, _Object$entries3 = Object.entries(options_list); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
          _key = _Object$entries3$_i[0],
          _value = _Object$entries3$_i[1];

      select_node.appendChild(options_list[_key]);
    }
  });
}

function updateEnableDisableConfig(ev) {
  //select_element, local_name
  var local_name = config_options[2][ev['path'][0]['id']];
  var element = document.getElementById(ev['path'][0]['id']).value;

  if (element == "enabled") {
    var obj = {};
    obj[local_name] = true;
    chrome.storage.local.set(obj);
  } else {
    var obj = {};
    obj[local_name] = false;
    chrome.storage.local.set(obj);
  }
}

function updateMultiConfig(ev) {
  //select_element, local_name
  var local_name = config_options[3][ev['path'][0]['id']]['local'];
  var element = document.getElementById(ev['path'][0]['id']).value;
  var obj = {};
  obj[local_name] = element;
  chrome.storage.local.set(obj);
}

var config_options = {
  2: {
    // Enable/Disable Options
    'sidebar': 'sidebarEnabled',
    'border': 'hasBorder',
    'next-piece': 'nextEnabled',
    'preview': 'previewEnabled',
    'hold': 'holdEnabled',
    'auto': 'autoplayEnabled'
  },
  3: {
    //Multiple Custom options
    'design': {
      'local': 'design',
      'options': {
        'Minimal': 'clean',
        'Classic': 'legends',
        'Bold': 'bold',
        'Tetra': 'tetra',
        'Wool': 'wool',
        'Crafty': 'crafty'
      }
    },
    'size': {
      'local': 'canvasSize',
      'options': {
        'Big': 'big',
        'Medium': 'medium',
        'Small': 'small'
      }
    }
  },
  4: {
    // Experimental Options
    'trans': 'transEnabled',
    'markers': 'markersEnabled'
  }
};
document.addEventListener('DOMContentLoaded', function () {
  //Create Config
  for (var _i4 = 0, _Object$entries4 = Object.entries(config_options[3]); _i4 < _Object$entries4.length; _i4++) {
    var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i4], 2),
        key = _Object$entries4$_i[0],
        value = _Object$entries4$_i[1];

    createMultiOption(key, value['local'], value['options']);
    document.getElementById(key).addEventListener('change', updateMultiConfig, false);
  }

  ;

  for (var _i5 = 0, _Object$entries5 = Object.entries(config_options[2]); _i5 < _Object$entries5.length; _i5++) {
    var _Object$entries5$_i = _slicedToArray(_Object$entries5[_i5], 2),
        _key2 = _Object$entries5$_i[0],
        _value2 = _Object$entries5$_i[1];

    createEnableDisable(_key2, _value2);
    document.getElementById(_key2).addEventListener('change', updateEnableDisableConfig, false);
  }

  ;

  for (var _i6 = 0, _Object$entries6 = Object.entries(config_options[4]); _i6 < _Object$entries6.length; _i6++) {
    var _Object$entries6$_i = _slicedToArray(_Object$entries6[_i6], 2),
        _key3 = _Object$entries6$_i[0],
        _value3 = _Object$entries6$_i[1];

    createExperimentalEnableDisable(_key3, _value3);
    document.getElementById(_key3).addEventListener('change', updateEnableDisableConfig, false);
  }

  ; //Listeners

  document.getElementById('back').addEventListener('click', goBack);
  document.getElementById('custom-keys').addEventListener('click', customKeys);
  document.getElementById('custom-textures').addEventListener('click', customTextures);
  document.addEventListener('keydown', keydown, false);
});