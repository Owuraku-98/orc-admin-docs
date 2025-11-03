export type Doc = {
	id: string;
	title: string;
	description: string;
	pageImage: {
		url: string;
		alt: string;
	} | null;
};

export type DocGroup = Omit<Doc, "pageImage"> & { docs: Doc[] };

export function getDocGroups(): DocGroup[] {
	return docs;
}

export async function getDoc(
	slug: string,
): Promise<(Doc & { docGroup: DocGroup; next: Doc | null }) | null> {
	let docGroup = docs.find(({ docs }) => docs.some(({ id }) => id === slug));

	if (!docGroup) {
		return null;
	}

	let index = docGroup.docs.findIndex(({ id }) => id === slug);

	return {
		...docGroup.docs[index],
		docGroup,
		next: index < docGroup.docs.length - 1 ? docGroup.docs[index + 1] : null,
	};
}

export async function getDocumentationContent(slug: string) {
	return (await import(`@/data/docs/${slug}.mdx`)).default;
}

export const docs: DocGroup[] = [
	{
		id: "welcome",
		title: "Welcome",
		description:
			"Introduction to the ORC Admin Web & Mobile Guide. This section provides an overview of the documentation structure and how to navigate through the various topics covered in the guide.",
		docs: [
			{
				id: "getting-started",
				title: "Getting Started",
				description:
					"Begin your journey with the ORC Admin platform. This section covers the initial steps to set up your account, navigate the interface, and understand the core features available to you.",
				pageImage: {
					url: `/welcome.png`,
					alt: "Log in screen of ORC Admin Web Application",
				},
			},
			{
				id: "sign-in",
				title: "Signing In",
				description:
					"Instructions for accessing your account securely. Learn about our authentication process and how to recover your account if needed.",
				pageImage: null,
			},
			{
				id: "dashboard",
				title: "Dashboard",
				description:
					"Overview of the main dashboard features. This section highlights the key components and functionalities that help you monitor and manage your activities effectively.",
				pageImage: null,
			},
		],
	},
	{
		id: "approvals",
		title: "Approvals",
		description: "Comprehensive guide on the approval processes within the ORC Admin platform. This section details the various types of approvals, workflows, and best practices for managing submissions efficiently.",
		docs: [
			{
				id: "approve-filings",
				title: "Approve Filings",
				description:
					"Learn how to review and approve filings within the ORC Admin platform. This section provides step-by-step guidance on managing submissions and ensuring compliance with organizational standards.",
				pageImage: null,
			},
			{
				id: "approve-information-requests",
				title: "Approve Information Requests",
				description:
					"Detailed instructions on handling information requests. Understand the process of reviewing, approving, or denying requests to maintain data integrity and security.",
				pageImage: null,
			},
			{
				id: "approve-documents-requests",
				title: "Approve Document Requests",
				description:
					"Guidance on managing document requests within the platform. This section covers the approval workflow and best practices for handling sensitive information.",
				pageImage: null,
			},
			{
				id: "approve-conversions",
				title: "Approve Conversions",
				description:
					"Steps to approve conversion requests. Learn how to evaluate and authorize conversions to ensure they meet the necessary criteria and standards.",
				pageImage: null,
			},
		],
			}
];

