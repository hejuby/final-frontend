import mockData from "../mockData.json";

const responseData: Record<string, object[]> = mockData;

// eslint-disable-next-line
export async function GET(
  request: Request,
  { params }: { params: { boardType: string } },
) {
  return Response.json(responseData[params.boardType], {
    status: 200,
  });
}
