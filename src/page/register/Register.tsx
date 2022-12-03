import React from "react";
import Styles from "./style.module.scss";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import {
  MdPhoneIphone,
  MdOutlineDateRange,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";
import { Si1Password } from "react-icons/si";
import moment from "moment";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillCalendarDateFill, BsGenderAmbiguous } from "react-icons/bs";
import { TbUserMinus } from "react-icons/tb";
import { RiLockPasswordFill, RiUser3Line } from "react-icons/ri";
import { dataGender } from "../../mock/mockData";
import CustomInput from "@/components/common/customInput/CustomInput";
import CustomDate from "@/components/common/customDate/CustomDate";
import CustomSelect from "@/components/common/customSelect/CustomSelect";
import useAuth from "@/hooks/useAuth";

function Register() {
  const { onRegister } = useAuth();
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values: any) => {
      onRegister(values);
    },
  });
  return (
    <div className={Styles.main}>
      {" "}
      <div className={`${Styles.headerTitle} mt-40`}>CusCare</div>
      <div className={`${Styles.title} mb-20`}>
        Đăng ký tài khoản chăm sóc khách hàng
      </div>
      <div className={`${Styles.form}`}>
        <form onSubmit={formik.handleSubmit}>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<RiUser3Line size={20} />}
              placeholder="Username"
              onChange={formik.handleChange}
              // value={formik.values.phone}
              name="username"
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<MdOutlineDriveFileRenameOutline size={20} />}
              placeholder="First Name"
              onChange={formik.handleChange}
              // value={formik.values.phone}
              name="first_name"
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<TbUserMinus size={20} />}
              placeholder="Last Name"
              onChange={formik.handleChange}
              // value={formik.values.phone}
              name="last_name"
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<MdPhoneIphone size={20} />}
              placeholder="Số điện thoại"
              onChange={formik.handleChange}
              // value={formik.values.phone}
              name="phone"
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<AiOutlineMail size={20} />}
              placeholder="Email"
              type="email"
              onChange={formik.handleChange}
              name="email"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomSelect
              label={<BsGenderAmbiguous size={20} />}
              defaultValue="nam"
              listOption={dataGender}
              type="text"
              onChange={(value: string) => {
                formik.setFieldValue("gender", value);
              }}
              name="gender"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomDate
              label={<BsFillCalendarDateFill size={20} />}
              placeholder="Birthday"
              type="email"
              onChange={(e: any) => {
                formik.setFieldValue(
                  "birthday",
                  moment(e).format("MM/DD/YYYY")
                );
              }}
              name="birthday"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<RiLockPasswordFill size={20} />}
              placeholder="Mật khẩu"
              type="password"
              onChange={formik.handleChange}
              name="password"
              // value={formik.values.password}
            />
          </div>
          <div className={Styles.inputForm}>
            <CustomInput
              label={<Si1Password size={20} />}
              placeholder="Xác nhận mật khẩu"
              type="password"
              onChange={formik.handleChange}
              name="confirm_password"
              // value={formik.values.password}
            />
          </div>
          <button className={`${Styles.btn} ${Styles.btnLogin} mb-20`}>
            Đăng ký
          </button>

          <div style={{ textAlign: "center", marginTop: "5px" }}>
            Bạn đã có tài khoản ?<Link to="/login">Đăng nhập </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
