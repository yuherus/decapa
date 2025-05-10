import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
        <div>
          <h2 className="text-lg font-semibold">MyJob</h2>
          <p className="mt-2">Call now: <strong>(319) 555-0115</strong></p>
          <p className="mt-1 text-sm">6391 Elgin St. Celina, Delaware 10299, New York, USA</p>
        </div>
        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="#">About</Link></li>
            <li><Link href="#">Contact</Link></li>
            <li><Link href="#">Pricing</Link></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Candidate</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="#">Browse Jobs</Link></li>
            <li><Link href="#">Browse Employers</Link></li>
            <li><Link href="#">Candidate Dashboard</Link></li>
            <li><Link href="#">Saved Jobs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Support</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link href="#">FAQs</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-sm mt-6">@ 2025 Decapa. All rights reserved</div>
    </footer>
  );
}
