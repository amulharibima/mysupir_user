export function convertDate(date) {
  date = String(date);

  // console.log('ini date', date.substring(0, 10));
  let time = date.substring(11, 16);
  let day = new Date(date.substring(0, 10)).getDay();
  // console.log('ini day', day);

  switch (day) {
    case 0:
      day = 'Minggu';
      break;
    case 1:
      day = 'Senin';
      break;
    case 2:
      day = 'Selasa';
      break;
    case 3:
      day = 'Rabu';
      break;
    case 4:
      day = 'Kamis';
      break;
    case 5:
      day = 'Jumat';
      break;
    case 6:
      day = 'Sabtu';
      break;
  }

  date = date.split('-');
  date = date.reverse();

  date[0] = parseInt(date[0]);

  switch (date[1]) {
    case '01':
      date[1] = 'Januari';
      break;
    case '02':
      date[1] = 'Februari';
      break;
    case '03':
      date[1] = 'Maret';
      break;
    case '04':
      date[1] = 'April';
      break;
    case '05':
      date[1] = 'Mei';
      break;
    case '06':
      date[1] = 'Juni';
      break;
    case '07':
      date[1] = 'Juni';
      break;
    case '08':
      date[1] = 'Agustus';
      break;
    case '09':
      date[1] = 'September';
      break;
    case '10':
      date[1] = 'Oktober';
      break;
    case '11':
      date[1] = 'November';
      break;
    case '12':
      date[1] = 'Desember';
      break;
  }

  return day + ', ' + date.join(' ') + ' ' + time;
}
