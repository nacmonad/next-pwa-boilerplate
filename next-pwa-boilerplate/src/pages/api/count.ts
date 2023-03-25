import type { NextApiRequest, NextApiResponse } from 'next'
import { Data, ErrorMsg } from '@/types';


const CntData: Data = { count: 0 };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMsg>
) {
  const { method, body } = req;
  
  switch(method) {
    case "GET":
      res.status(200).json( CntData );
      break;
    case "POST":
      const { type } : { type: string } = body;
      if(type.toLowerCase() === 'inc') CntData.count++;
      if(type.toLowerCase() === 'dec') CntData.count--;
      res.status(200).json( CntData )
      break;
    default:
      res.status(403).json( {
        name: "Error",
        message: "UnhandledMethod",
        stack: null
      } );
      break;
  }
  
  
}
