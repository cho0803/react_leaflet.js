# Leaflet.js
## 라이브러리 설치
<span style="font-size: 1.3rem">1. leaflet.js 라이브러리 설치</span>

```
npm install leaflet react-leaflet
```

<details>
<summary>테스트코드</summary>
 
```
import {  MapContainer,  TileLayer,  Marker,  Popup, } from "react-leaflet";


export default function Map() {
  return (
      <MapContainer
        center={[36.17, 127.83]} // 초기 중심 좌표
        zoom={6.0} // 초기 줌 레벨
        zoomSnap={0.5} // 줌 레벨 스냅
        style={{ width: "100vw", height: "100vh",}}
      >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <Marker 
          position={[36.17, 127.83]} 
          eventHandlers={{
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
          }}
        >  
          <Popup> A pretty CSS3 popup. <br /> Easily customizable.</Popup>
        </Marker>
      </MapContainer>
  );
}

```

</details>

* * *
<span>2. useQuery, useQueryClient 라이브러리 설치</span>
- useQuery : 서버에서 데이터를 가져오고, 캐싱하며, 상태를 관리.
- useQueryClient : QueryClient 인스턴스에 접근하여 캐시를 직접 조작하거나 쿼리를 무효화.
```
npm install react-hook-form
npm install @tanstack/react-query
```

<details>
<summary>테스트코드</summary>
 
<span>2-1. inedx.jsx 파일 의존성 추가</span>

```
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
```

<span>2-2. import 구문을 사용하여 코드에서 라이브러리 불러오기가</span>
```
import { useQuery, useQueryClient } from "@tanstack/react-query";
```

</details>

* * *
<span>3. useForm 라이브러리 설치</span>
- useform : 폼 관리를 간편하게 도와주는 React Hook Form 라이브러리.

```
npm install react-hook-form
```

<details>
<summary>테스트코드</summary>
 
```
import React from "react";
import { useForm } from "react-hook-form";

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Name"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <input
        {...register("email", { 
          required: "Email is required", 
          pattern: {
            value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            message: "Invalid email"
          }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

</details>

* * *
<span>4. uuid, axios 라이브러리 설치</span>
- uuid : RFC9562 (구 RFC4122) 표준을 준수하는 UUID를 생성하는 라이브러리.
- axios : 브라우저와 Node.js에서 사용할 수 있는 Promise 기반 HTTP 클라이언트 라이브러리.

```
npm install uuid
```
```
npm install axios
```
