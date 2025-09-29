export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/random", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch quote");

    const data = await res.json();

    return Response.json({
      text: data[0].q,
      author: data[0].a,
    });
  } catch (error) {
    console.error("API Error:", error);
    return Response.json(
      { text: "Could not fetch quote", author: "Error" },
      { status: 500 }
    );
  }
}
