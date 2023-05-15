import React from "react";
import { FaUtensils, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

const About: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-5">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">Tentang Mbadok</h1>
			<p className="text-lg text-gray-600 mb-8 text-center max-w-md">
				Mbadok adalah restoran yang menyajikan masakan nusantara dengan cita rasa khas Indonesia. Kami
				berkomitmen untuk memberikan pengalaman kuliner yang istimewa dan kenangan tak terlupakan bagi
				para pelanggan kami.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
						<FaUtensils className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Masakan Nusantara</h2>
					<p className="text-gray-600 text-center">
						Kami menggunakan bahan-bahan segar dan rempah-rempah pilihan untuk menyajikan masakan
						nusantara yang autentik dan lezat.
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-pink-500 rounded-full mb-4">
						<FaHeart className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Penuh Kasih Sayang</h2>
					<p className="text-gray-600 text-center">
						Kami sangat peduli dengan kepuasan pelanggan kami. Setiap hidangan yang kami sajikan
						dipersiapkan dengan cinta dan perhatian untuk memberikan pengalaman kuliner yang
						istimewa.
					</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
						<FaMapMarkerAlt className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Lokasi Strategis</h2>
					<p className="text-gray-600 text-center">
						Mbadok berlokasi di pusat kota, dengan akses yang mudah dan parkir yang nyaman. Kami
						siap menyambut Anda dengan suasana yang hangat dan ramah.
					</p>
				</div>
			</div>
		</div>
	);
};

export default About;
