export function getGoogleOAuthURL() {
	const rootUrl = process.env.NEXT_PUBLIC_GOOGLE_ROOT_URL as string;

	const options = {
		redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
		client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
		access_type: "offline",
		response_type: "code",
		prompt: "consent",
		scope:
			`https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile ${process.env.NEXT_PUBLIC_GOOGLE_SCOPE}` as string,
	};

	const qs = new URLSearchParams(options);

	return `${rootUrl}?${qs.toString()}`;
}

export default getGoogleOAuthURL;
