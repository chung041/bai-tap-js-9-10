//Câu 1: In ra table danh sách nhân viên
let DSNhanvien = [];
function printeTable(ds) {
  let set11 = ds.reduce((in1, DSNV) => {
    let Name1 = new Nhanvien(
      DSNV.taiKhoan,
      DSNV.hoVaTen,
      DSNV.email,
      DSNV.matKhau,
      DSNV.ngayLam,
      DSNV.luongCB,
      DSNV.chucVu,
      DSNV.gioLam
    );
    return (
      in1 +
      `
        <tr>
            <td>${Name1.taiKhoan}</td>
            <td>${Name1.hoVaTen}</td>
            <td>${Name1.email}</td>
            <td>${Name1.ngayLam}</td>
            <td>${Name1.chucVu}</td>
            <td>${Name1.calcTongLuong()}</td>
            <td>${Name1.ranking()}</td>
            <td>
                <button class="btn btn-success" 
                data-toggle="modal"
                    data-target="#myModal"
                onclick="selectNvToUpdate('${Name1.taiKhoan}')">Thêm vào</button>
                <button class="btn btn-danger" 
                onclick="deleteNhanvien('${Name1.taiKhoan}')">Delete</button>
            </td>
        </tr>    
        `
    );
  }, "");
  getElement("#tableDSNV1").innerHTML = set11;
}
printeTable(DSNhanvien);

//câu 2 : Thêm nhân viên mới
function themNV() {
  let tk = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let luongCB = +getElement("#luongCB").value;
  let chucVu = getElement("#chucvu").value;
  let gioLam = getElement("#gioLam").value;

  if (!validate()) {
    return;
  }

  const nv = new Nhanvien(
    tk,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );
  DSNhanvien.push(nv);

  printeTable(DSNhanvien);

  resetForm();
}
getElement("#btnThemNV").onclick = themNV;


//câu 3: Tạo lớp đối tượng
function Nhanvien(
  tk,
  hoVaTen,
  email,
  matKhau,
  ngayLam,
  luongCB,
  chucVu,
  gioLam
) {
  this.taiKhoan = tk;
  this.hoVaTen = hoVaTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCB = luongCB;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}

//Câu 4: Validation
// + Tài khoản tối đa 4 - 6 ký số, không để trống
// + Tên nhân viên phải là chữ, không để trống
// + Email phải đúng định dạng, không để trống
// + mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không
// để trống
// + Ngày làm không để trống, định dạng mm/dd/yyyy
// + Lương cơ bản 1 000 000 - 20 000 000, không để trống
// + Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
// + Số giờ làm trong tháng 80 - 200 giờ, không để trống
function validate() {
  let isCheck = true;

  // Tài khoản tối đa 4 - 6 ký số, không để trống
  let account = getElement("#tknv").value;
  if (!account.trim() || account.length < 4 || account.length > 6) {
    isCheck = false;
    getElement("#tbTKNV").innerHTML = "Tài khoản tối đa 4 - 6 ký số, không để trống";
    getElement("#tbTKNV").style.display = "block";
  } else {
    getElement("#tbTKNV").innerHTML = "";
    getElement("#tbTKNV").style.display = "none";
  }

  // Tên nhân viên phải là chữ, không để trống
  let Nam32 = getElement("#name").value;

  const regexHasNumber = /\d/;
  if (!Nam32.trim() || regexHasNumber.test(Nam32)) {
    isCheck = false;
    getElement("#tbTen").innerHTML = "Tên nhân viên phải là chữ, không để trống";
    getElement("#tbTen").style.display = "block";
  } else {
    getElement("#tbTen").innerHTML = "";
    getElement("#tbTen").style.display = "none";
  }

  //Email phải đúng định dạng, không để trống
  let email = getElement("#email").value;

  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (!email.trim() || !regexEmail.test(email)) {
    isCheck = false;
    getElement("#tbEmail").innerHTML = "Email phải đúng định dạng, không để trống";
    getElement("#tbEmail").style.display = "block";
  } else {
    getElement("#tbEmail").innerHTML = "";
    getElement("#tbEmail").style.display = "none";
  }

  //mật khẩu 6-10 kí tự, có 1 kí tự hoa, 1 số, 1 kí tự đặc biệt
  let password = getElement("#password").value;
  const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/;
  if (!password.trim() || !regexPassword.test(password)) {
    isCheck = false;
    getElement("#tbMatKhau").innerHTML =
      "+ mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt), không để trống ";
    getElement("#tbMatKhau").style.display = "block";
  } else {
    getElement("#tbMatKhau").innerHTML = "";
    getElement("#tbMatKhau").style.display = "none";
  }

  //Ngày làm không để trống, định dạng mm/dd/yyyy
  let Month12 = getElement("#datepicker").value;
  const regexDate =
    /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  if (!Month12.trim() || !regexDate.test(Month12)) {
    isCheck = false;
    getElement("#tbNgay").innerHTML = "không để trống ngày";
    getElement("#tbNgay").style.display = "block";
  } else {
    getElement("#tbNgay").innerHTML = "";
    getElement("#tbNgay").style.display = "none";
  }

  //Lương cơ bản 1000000 - 20000000, không để trống
  let salary = getElement("#luongCB").value;
  if (!salary.trim() || salary < 1000000 || salary > 200000000) {
    isCheck = false;
    getElement("#tbLuongCB").innerHTML = "Lương cơ bản 1000000 - 20000000";
    getElement("#tbLuongCB").style.display = "block";
  } else {
    getElement("#tbLuongCB").innerHTML = "";
    getElement("#tbLuongCB").style.display = "none";
  }

  //Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)
  let position = getElement("#chucvu").value;
  if (!position) {
    isCheck = false;
    getElement("#tbChucVu").innerHTML = "Chọn Chức Vụ";
    getElement("#tbChucVu").style.display = "block";
  } else {
    getElement("#tbChucVu").innerHTML = "";
    getElement("#tbChucVu").style.display = "none";
  }

  //Số giờ làm trong tháng 80 - 200 giờ, không để trống
  let Time80 = getElement("#gioLam").value;
  if (!Time80.trim() || Time80 < 80 || Time80 > 200) {
    isCheck = false;
    getElement("#tbGiolam").innerHTML = "Tổng giờ làm từ 80-200 giờ/tháng";
    getElement("#tbGiolam").style.display = "block";
  } else {
    getElement("#tbGiolam").innerHTML = "";
    getElement("#tbGiolam").style.display = "none";
  }
  // resetForm();
  return isCheck;
}
//Câu 5: Xây dựng phương thức tính tổng lương
Nhanvien.prototype.calcTongLuong = function () {
  if (this.chucVu === "Giám Đốc") {
    return this.luongCB * 3;
  } else if (this.chucVu === "Trưởng Phòng") {
    return this.luongCB * 2;
  } else {
    return this.luongCB;
  }
};

//câu 6 : Xây dựng phương thức xếp loại nhân viên
Nhanvien.prototype.ranking = function () {
  if (this.gioLam >= 192) {
    return "Nhân Viên Xuất Sắc";
  } else if (this.gioLam >= 176) {
    return "Nhân Viên Giỏi";
  } else if (this.gioLam >= 160) {
    return "Nhân Viên Khá";
  } else {
    return "Nhân Viên Trung Bình";
  }
};

//Câu 7: Xoá nhân viên
function deleteNhanvien(taiKhoanNV) {
  DSNhanvien = DSNhanvien.filter((nv) => {
    return nv.taiKhoan !== taiKhoanNV;
  });
  printeTable(DSNhanvien);
}

//Câu 8: Cập nhật nhân viên
function selectNvToUpdate(taiKhoan) {
  selectNv = DSNhanvien.find((nv) => {
    return nv.taiKhoan === taiKhoan;
  });

  getElement("#tknv").value = selectNv.taiKhoan;
  getElement("#name").value = selectNv.hoVaTen;
  getElement("#email").value = selectNv.email;
  getElement("#password").value = selectNv.matKhau;
  getElement("#datepicker").value = selectNv.ngayLam;
  getElement("#luongCB").value = selectNv.luongCB;
  getElement("#chucvu").value = selectNv.chucVu;
  getElement("#gioLam").value = selectNv.gioLam;


  getElement("#tknv").disabled = true;
  getElement("#btnThemNV").disabled = true;
  getElement("#btnCapNhat").disabled = false;
}


getElement("#btnCapNhat").onclick = function () {
  let tk = getElement("#tknv").value;
  let name = getElement("#name").value;
  let email = getElement("#email").value;
  let password = getElement("#password").value;
  let date = getElement("#datepicker").value;
  let luongCB = +getElement("#luongCB").value;
  let chucVu = getElement("#chucvu").value;
  let gioLam = getElement("#gioLam").value;

  if (!validate()) {
    return;
  }
  // tạo OBJ
  const nv = new Nhanvien(
    tk,
    name,
    email,
    password,
    date,
    luongCB,
    chucVu,
    gioLam
  );

  let index = DSNhanvien.findIndex((DSNV) => {
    return DSNV.taiKhoan === tk;
  });

  DSNhanvien[index] = nv;
  printeTable(DSNhanvien);
};

//Câu 9: Tìm nhân viên theo xếp loại
getElement("#TimNV").onclick = function () {
  let xeploainv = getElement("#xeploaiten").value;

  let xeploainhanvien = DSNhanvien.filter((nv) => {
    return nv.ranking().toLowerCase().indexOf(xeploainv.toLowerCase()) !== -1;
  });

  if (!xeploainv) {
    printeTable(DSNhanvien);
  } else {
    printeTable(xeploainhanvien);
  }
};

function getElement(selector) {
  return document.querySelector(selector);
}

//Hàm bắt sự kiện thì:
getElement("#btnThem").onclick = function () {
  getElement("#tknv").disabled = false;
  getElement("#btnThemNV").disabled = false;
  getElement("#btnCapNhat").disabled = true;
};
getElement("#btnDong").onclick = function () {
  resetForm();
};

//hàm reset
function resetForm() {
  getElement("#tknv").value = "";
  getElement("#name").value = "";
  getElement("#email").value = "";
  getElement("#password").value = "";
  getElement("#datepicker").value = "";
  getElement("#luongCB").value = "";
  getElement("#chucvu").value = "";
  getElement("#gioLam").value = "";
}
