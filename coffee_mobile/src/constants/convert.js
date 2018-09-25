import { NetInfo } from "react-native";

export const vietnameseToAlias = function (alias) {
  if (!alias) return '';
  let str = alias;
  str = str.trim().toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
};

export const convertToNumber = function (text) {
  if (!text) return '';
  let str = text
  str = str.split('.').join('')
  return str
}

export const timestampToString = function (timestamp) {
  let date = new Date(timestamp);
  let str = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear()
  return str
};

export const timestampToFullString = function (timestamp) {
  let date = new Date(timestamp);
  let str = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/'
    + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
  return str
}

export const stringToFormatVND = function (number) {
  let stringNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return stringNumber;
}

export const isNetworking = function (param, naviga) {
  NetInfo.isConnected.fetch().then(isConnected => {
    //console.log('First, is ' + (isConnected ? 'online' : 'offline'));
  });

  function handleFirstConnectivityChange(isConnected) {
    param(isConnected, naviga)
    //console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  NetInfo.isConnected.addEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}

export const timeSince = function (dateTemp) {
  var seconds = Math.floor((new Date() - dateTemp) / 1000);
  var interval = Math.floor(seconds / (7 * 24 * 60 * 60));
  console.log('*****', seconds)
  console.log('-----',interval)
  if (interval >= 1) {
    var date = new Date(dateTemp);
    var month = date.getMonth() + 1 + '';
    var day = date.getDate() + '';
    var str = '';
    if (date.getMonth() < 9) {
      month = '0' + month;
    }
    if (date.getDate() < 10) {
      day = '0' + date.getDate();
    }
    str = day + '/' + month + '/' + date.getFullYear();
    return str;
  }

  interval = Math.floor(seconds / (24 * 60 * 60 ));
  if (interval >= 1) {
    return interval + ' ngày trước';
  }

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval + ' giờ trước';
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' phút trước';
  }
  return (Math.floor(seconds) > 0 ? Math.floor(seconds) : 0) + ' giây trước';
}

export const getFormattedDate = function (dateServer) {
    var todayTime = new Date(dateServer);
    var month = todayTime .getMonth() + 1;
    var day = todayTime .getDate();
    var year = todayTime .getFullYear();
    var hours = todayTime.getHours()
    var minute = todayTime.getMinutes()
    return day + "/" + month + "/" + year + " " + hours + ":" + minute;
}

/*
export const district = function (id) {
  switch (id) {
    case 1:
      return require('../assets/filejson/1')
    case  2:
      return require('../assets/filejson/2')
    case  3:
      return require('../assets/filejson/3')
    case  4:
      return require('../assets/filejson/4')
    case  5:
      return require('../assets/filejson/5')
    case  6:
      return require('../assets/filejson/6')
    case  7:
      return require('../assets/filejson/7')
    case 8:
      return require('../assets/filejson/8')
    case  9:
      return require('../assets/filejson/9')
    case  10:
      return require('../assets/filejson/10')
    case  11:
      return require('../assets/filejson/11')
    case  12:
      return require('../assets/filejson/12')
    case  13:
      return require('../assets/filejson/13')
    case  14:
      return require('../assets/filejson/14')
    case  15:
      return require('../assets/filejson/15')
    case  16:
      return require('../assets/filejson/16')
    case 17:
      return require('../assets/filejson/17')
    case  18:
      return require('../assets/filejson/18')
    case  19:
      return require('../assets/filejson/19')
    case  20:
      return require('../assets/filejson/20')
    case  21:
      return require('../assets/filejson/21')
    case  22:
      return require('../assets/filejson/22')
    case  23:
      return require('../assets/filejson/23')
    case  24:
      return require('../assets/filejson/24')
    case  25:
      return require('../assets/filejson/25')
    case  26:
      return require('../assets/filejson/26')
    case  27:
      return require('../assets/filejson/27')
    case  28:
      return require('../assets/filejson/28')
    case 29:
      return require('../assets/filejson/29')
    case  30:
      return require('../assets/filejson/30')
    case  31:
      return require('../assets/filejson/31')
    case  32:
      return require('../assets/filejson/32')
    case  33:
      return require('../assets/filejson/33')
    case 34:
      return require('../assets/filejson/34')
    case 35:
      return require('../assets/filejson/35')
    case  36:
      return require('../assets/filejson/36')
    case  37:
      return require('../assets/filejson/37')
    case  38:
      return require('../assets/filejson/38')
    case  39:
      return require('../assets/filejson/39')
    case 40:
      return require('../assets/filejson/40')
    case  41:
      return require('../assets/filejson/41')
    case  42:
      return require('../assets/filejson/42')
    case  43:
      return require('../assets/filejson/43')
    case 44:
      return require('../assets/filejson/44')
    case  45:
      return require('../assets/filejson/45')
    case  46:
      return require('../assets/filejson/46')
    case  47:
      return require('../assets/filejson/47')
    case  48:
      return require('../assets/filejson/49')
    case  49:
      return require('../assets/filejson/49')
    case  50:
      return require('../assets/filejson/50')
    case  51:
      return require('../assets/filejson/51')
    case  52:
      return require('../assets/filejson/52')
    case  53:
      return require('../assets/filejson/53')
    case  54:
      return require('../assets/filejson/54')
    case  55:
      return require('../assets/filejson/55')
    case  56:
      return require('../assets/filejson/56')
    case  57:
      return require('../assets/filejson/57')
    case  58:
      return require('../assets/filejson/58')
    case  59:
      return require('../assets/filejson/59')
    case  60:
      return require('../assets/filejson/60')
    case  61:
      return require('../assets/filejson/61')
    case  62:
      return require('../assets/filejson/62')
    case  63:
      return require('../assets/filejson/63')
    default:
      return require('../assets/filejson/63')
  }
}*/
