import { FC } from "react";
import { Input } from "../../atoms/input";
import Flex from "../../atoms/flex";
import { Button } from "../../atoms/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const PackFormSection: FC = () => {
  const formik = useFormik({
    initialValues: {
      createdAt: "",
      pic: "",
      grossWeight: 0,
      qtyA: 0,
      qtyB: 0,
      qtyC: 0,
      rejectedQty: 0,
    },
    validationSchema: Yup.object({
      createdAt: Yup.string().required("Tanggal harus diisi"),
      pic: Yup.string().required("PIC harus diisi"),
      grossWeight: Yup.number().required("Berat kotor harus diisi"),
      qtyA: Yup.number().required("Jumlah pack A harus diisi"),
      qtyB: Yup.number().required("Jumlah pack B harus diisi"),
      qtyC: Yup.number().required("Jumlah pack C harus diisi"),
      rejectedQty: Yup.number().required("Jumlah reject harus diisi"),
    }),
    onSubmit: async (values) => {
      try {
        console.log(values);
        const res = await axios.post(`${baseUrl}/packs`, values);
        console.log(res);
        if (res.status === 201) {
          alert("Data berhasil disimpan");
        } else {
          alert("Data gagal disimpan");
        }
      } catch (error) {
        console.error(error);
        alert("Data gagal disimpan");
      }
    },
  });
  return (
    <section>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="col" directionMd="col" gap="gap-5" className="max-w-[360px] mx-auto">
          <Flex direction="col" directionMd="col" align="start" gap="gap-3" className="w-full">
            <label htmlFor="createdAt" className="font-medium text-neutral-900">
              Tanggal
            </label>
            <input
              type="datetime-local"
              name="createdAt"
              id="createdAt"
              value={formik.values.createdAt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className=" rounded-[8px] p-[8px] bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
            />
            {formik.errors.createdAt && formik.touched.createdAt ? <p className="text-sm text-red-500">{formik.errors.createdAt}</p> : null}
          </Flex>
          <Input
            id="pic"
            name="pic"
            label="PIC"
            value={formik.values.pic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.pic}
            placeholder="Masukkan nama PIC"
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Input
            type="number"
            id="grossWeight"
            name="grossWeight"
            label="Berat Kotor"
            placeholder="Masukkan berat kotor"
            value={formik.values.grossWeight}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.grossWeight}
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Input
            type="number"
            id="qtyA"
            name="qtyA"
            label="Jumlah Pack A"
            placeholder="Masukkan jumlah pack A"
            value={formik.values.qtyA}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.qtyA}
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Input
            type="number"
            id="qtyB"
            name="qtyB"
            label="Jumlah Pack B"
            placeholder="Masukkan jumlah pack B"
            value={formik.values.qtyB}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.qtyB}
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Input
            type="number"
            id="qtyC"
            name="qtyC"
            label="Jumlah Pack C"
            placeholder="Masukkan jumlah pack C"
            value={formik.values.qtyC}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.qtyC}
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Input
            type="number"
            id="rejectedQty"
            name="rejectedQty"
            label="Jumlah Reject"
            placeholder="Masukkan jumlah pack reject"
            value={formik.values.rejectedQty}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errorMessage={formik.errors.rejectedQty}
            className="w-full flex flex-col gap-3 font-medium text-neutral-900"
            inputClassName="rounded-lg p-2 bg-neutral-50 border-neutral-300 focus:outline-none text-neutral-900 font-normal border"
          />
          <Button type="submit" className="mt-5 w-full">
            Simpan
          </Button>
        </Flex>
      </form>
    </section>
  );
};

export default PackFormSection;
