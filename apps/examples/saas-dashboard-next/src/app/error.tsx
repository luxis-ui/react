
'use client';

export default function ErrorPage() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'red' }}>
			<h2>Something went wrong!</h2>
			<p>Please try again later.</p>
		</div>
	);
}
