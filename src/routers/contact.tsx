import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
	return (
		<div className="flex flex-col items-center justify-center mt-5">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">Hubungi Kami</h1>
			<p className="text-lg text-gray-600 mb-8 text-center max-w-md">
				Anda dapat menghubungi kami melalui informasi kontak di bawah ini. Kami senang mendengar dari
				Anda dan siap melayani dengan baik.
			</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
						<FaPhone className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Telepon</h2>
					<p className="text-gray-600 text-center">Hubungi kami di: +62 123 456 789</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
						<FaEnvelope className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
					<p className="text-gray-600 text-center">Kirimkan email ke: info@mbadok.com</p>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
						<FaMapMarkerAlt className="text-white text-2xl" />
					</div>
					<h2 className="text-xl font-semibold text-gray-800 mb-2">Alamat</h2>
					<p className="text-gray-600 text-center">
						Kunjungi kami di: Jl. Jenderal Sudirman No. 123, Jakarta Pusat, 12345
					</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
