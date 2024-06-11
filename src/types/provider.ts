import { Constructor } from './constructor'
import { ProviderClassRef } from './provider-class-ref'
import { ProviderFactoryRef } from './provider-factory-ref'

export type Provider = Constructor | ProviderFactoryRef | ProviderClassRef
