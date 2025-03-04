import { Provider } from "@prisma/client";

export type ProviderInfo = {
  provider: Provider;
  providerId: string;
  name: string;
  email: string;
};
