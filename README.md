### Installation

```bash
$ npm install --save super-simple-encryption
```

or if you prefer yarn

```bash
$ yarn add super-simple-encryption
```

### Usage

```typescript
import { SuperSimpleEncryption } from "super-simple-encryption";

const enc = new SuperSimpleEncryption("32 digit key");

const encrypted = enc.encrypt("Hello World"); // returns encrypted string

const decrypted = enc.decrypt(encrypted); // returns decrypted string
```
