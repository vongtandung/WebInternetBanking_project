
# Final Project
##Team member
#### Vòng Tần Dũng _ 1512082
#### Lê Võ Hoàng Duy _ 1512069


##TECHNIQUES
1.SPA (Frontend)
2.vuejs / reactjs
3.vue-router / react-router
4.vuex / redux
###Backend
1.RESTful / GraphQL
2.BlockChain (+2.5đ)
3.BLOCKCHAIN TUTORIAL

`Naivecoin [http://lhartikk.github.io]`

##APP #1: SPA INTERNET BANKING
###SPA Internet Banking có các chức năng sau: 
1.Đăng nhập, có sử dụng Google Recaptcha
2.Thể hiện danh sách tài-khoản-thanh-toán của người dùng
3.Mỗi tài-khoản-thanh-toán chỉ thể hiện số-tài-khoản & số-dư-hiện-tại
4.Chuyển khoản nội bộ (cùng ngân hàng)
5.Chọn tài-khoản-thanh-toán nguồn
6.Điền thông tin người nhận (điền số tài khoản, hệ thống tự động truy vấn các thông tin còn lại (không truy vấn số dư) của người nhận)
7.Nhập số tiền chuyển & nội dung chuyển
8.Chọn hình thức thanh toán phí (người nhận trả phí / người gửi trả phí)
9.Ra lệnh CHUYỂN TIỀN
10.Yêu cầu người gửi nhập OTP xác nhận giao dịch (người gửi nhận OTP qua email sau khi ra lệnh CHUYỂN TIỀN *bước e*)
11.Thiết lập danh sách người nhận
Thông tin gồm { số tài khoản, tên gợi nhớ }. Trong trường hợp người dùng không nhập tên-gợi-nhớ, hệ thống sử dụng tên-đăng-ký của tài khoản người nhận làm tên-gợi-nhớ
12.Xem lịch sử giao dịch của 1 tài khoản
13.Đóng 1 tài-khoản-thanh-toán
14.Hệ thống yêu cầu người dùng duy trì ít nhất 1 tài-khoản-thanh-toán
15.Nếu tài-khoản-thanh-toán còn số dư khả dụng, hệ thống yêu cầu người dùng chuyển toàn bộ số dư sang 1 tài-khoản-thanh-toán khác trước khi đóng
16.Chức năng dành riêng cho nhân viên
17.Tạo tài khoản người dùng
18.Thông tin đăng nhập
 Thông tin cá nhân (họ tên, email, phone)
19.Tạo tài-khoản-thanh-toán cho người dùng, mỗi tài khoản người dùng có thể có nhiều tài-khoản-thanh-toán
20.Nạp tiền vào 1 tài-khoản-thanh-toán bất kỳ
21.Chức năng dành riêng cho ban giám đốc ngân hàng (xem thêm mô tả App#2 bên dưới)
22.Truy vấn số dư ví

##APP #2: BLOCKCHAIN SYSTEM
Mỗi ngân hàng có 1 ví trên hệ thống blockchain NAIVECOIN, và là 1 node trong hệ thống này
Giao dịch chuyển khoản liên ngân hàng từ tài khoản A@BankA sang tài khoản B@BankB được hiểu như 1 tập hợp lệnh { trừ tiền tài khoản A ở BankA, chuyển tiền từ ví BankA sang ví BankB, cộng tiền tài khoản B ở BankB }

###NOTES
1.Các dòng mô tả có màu XANH chỉ thực hiện khi có cài đặt blockchain
2.Mọi api đều phải cài đặt JWT access-token và refresh-token
3.Email OTP phải có định dạng nghiêm túc


