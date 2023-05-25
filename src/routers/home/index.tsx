import { Timeline } from "flowbite-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiCalendar } from "react-icons/bi";

const listInfo = [
	{
		title: "Pertukaran Pelajar",
		text: "Bentuk kegiatan pembelajaran dalam Program Merdeka Belajar Kampus Merdeka (MBKM) yang memberikan kesempatan kepada mahasiswa untuk mengambil perkuliahan selama 1 atau 2 semester pada program studi lain",
	},
	{
		title: "Magang / Praktik Kerja",
		text: "Bentuk kegiatan pembelajaran dalam Program Merdeka Belajar Kampus Merdeka (MBKM) yang memberikan kesempatan kepada mahasiswa untuk mengambil perkuliahan selama 1 atau 2 semester pada program studi lain",
	},
	{
		title: "Asistensi di Mengajar di Satuan Pendidikan",
		text: "Bentuk kegiatan pembelajaran yang dilakukan mahasiswa secara kolaboratif di bawah bimbingan guru dan dosen pembimbing di satuan pendidikan formal",
	},

	{
		title: "Penelitian / Riset",
		text: "Bentuk kegiatan pembelajaran untuk membangun cara berpikir kritis mahasiswa yang memiliki passion menjadi peneliti untuk lebih mendalami, memahami, dan melakukan metode riset secara lebih baik yang sangat dibutuhkan untuk berbagai rumpun keilmuan pada jenjang pendidikan tinggi",
	},
	{
		title: "Proyek Kemanusiaan",
		text: "Bentuk kegiatan pembelajaran yang memberikan kesempatan kepada mahasiswa mengembangkan kegiatan kemanusiaan secara mandiri yang dibuktikan dengan penjelasan atau proposal kegiatan kemanusiaan",
	},
	{
		title: "Kegiatan Kewirausahaan",
		text: "Bentuk kegiatan pembelajaran yang memberikan kesempatan menciptakan aktivitas usaha melalui analisis kebutuhan dan peluang pasar",
	},
	{
		title: "Studi / Proyek Indenpenden",
		text: "Bentuk kegiatan pembelajaran yang mengakomodasi kegiatan mahasiswa yang memiliki passion untuk mewujudkan karya besar yang dilombakan di tingkat nasional dan internasional atau karya dari ide yang inovatif",
	},
	{
		title: "Membangun Desa / Kuliah Kerja Nyata Tematik",
		text: "Bentuk kegiatan pembelajaran yang memberikan pengalaman belajar kepada mahasiswa untuk hidup di tengah masyarakat di luar kampus",
	},
];

const Home = () => {
	const navigation = useNavigate();
	const isAuth = true;
	useEffect(() => {
		if (!isAuth) {
			navigation("/login");
		}
	}, []);
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow m-5 p-8">
			{/* <Timeline horizontal={true}>
				<Timeline.Item>
					<Timeline.Point icon={BiCalendar} />
					<Timeline.Content>
						<Timeline.Title>Flowbite Library v1.0.0</Timeline.Title>
						<Timeline.Time>Released on December 2, 2021</Timeline.Time>
						<Timeline.Body>
							Get started with dozens of web components and interactive
							elements.
						</Timeline.Body>
					</Timeline.Content>
				</Timeline.Item>
				<Timeline.Item>
					<Timeline.Point icon={BiCalendar} />
					<Timeline.Content>
						<Timeline.Title>Flowbite Library v1.2.0</Timeline.Title>
						<Timeline.Time>Released on December 23, 2021</Timeline.Time>
						<Timeline.Body>
							Get started with dozens of web components and interactive
							elements.
						</Timeline.Body>
					</Timeline.Content>
				</Timeline.Item>
				<Timeline.Item>
					<Timeline.Point icon={BiCalendar} />
					<Timeline.Content>
						<Timeline.Title>Flowbite Library v1.3.0</Timeline.Title>
						<Timeline.Time>Released on January 5, 2022</Timeline.Time>
						<Timeline.Body>
							Get started with dozens of web components and interactive
							elements.
						</Timeline.Body>
					</Timeline.Content>
				</Timeline.Item>
			</Timeline> */}
		</div>
	);
};

export default Home;

// <div className="flex flex-col md:flex-row">
// 	<div className="bg-white border border-gray-200 rounded-lg shadow md:w-3/5 m-5 p-8">
// 		<p className="mb-3 text-lg text-gray-500 md:text-xl">
// 			MERDEKA BELAJAR KAMPUS MERDEKA
// 		</p>
// 		<p className="text-gray-500 text-sm">
// 			ITERA sebagai Kampus Merdeka selalu berusaha memberikan kesempatan
// 			bagi segenap sivitas akademika untuk mengasah kemampuan sesuai bakat
// 			dan minat. Dengan langsung terjun ke lingkungan masyarakat , ITERA
// 			lewat program Kampus Merdeka juga selalu berusaha untuk membantu
// 			memecahkan permasalahan di masyarakat sebagai bentuk pengabdian
// 		</p>

// 		<ul className=" space-y-4 text-gray-500 list-inside mt-10">
// 			<li>
// 				Program Kegiatan Merdeka Belajar Kampus Merdeka terdapat 8
// 				Program, yaitu:
// 				<ol className="pl-5 mt-2 space-y-1 list-decimal list-inside">
// 					{listInfo.map((item, index) => (
// 						<li key={index} className="my-5">
// 							{item.title} <br /> <small>{item.text}</small>
// 						</li>
// 					))}
// 				</ol>
// 			</li>
// 		</ul>
// 	</div>
// 	<div className="bg-white border border-gray-200 rounded-lg shadow md:w-2/6 m-5"></div>
// </div>;
