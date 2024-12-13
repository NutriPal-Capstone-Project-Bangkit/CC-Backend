# 1. Nutripal Profile API

 <h1>API Docs</h1>

![Run in Postman](https://run.pstmn.io/button.svg)

---

Base URL:

 <p >
  <a href="https://nutripal-profile-1006183382175.us-central1.run.app/">Nutripal-Profile-API</a>
</p>

### Profile
- Endpoint
  - /profile
  - /profile/(uid)
- Method
  - POST
  - GET
  - PUT
- Request Body
  - activityLevel: string
  - age: string
  - gender: string
  - height: string
  - name: string
  - profilePicture: string
  - uid: string
  - weight: string
- Contoh Request dalam RAW
   - POST
```json
{
  "activityLevel": "Aktif",
  "age": "23",
  "gender": "Pria",
  "height": "175",
  "name": "User Tiga",
  "profilePicture": "file:///data/user/0/com.example.nutripal/cache/temp5153547958599274652.jpg",
  "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
  "weight": "62"
}

```
- Response
```json
{
  "message": "Profile created successfully",
  "profile": {
    "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
    "name": "User Tiga",
    "gender": "Pria",
    "age": "23",
    "weight": "62",
    "height": "175",
    "activityLevel": "Aktif",
    "profilePicture": "file:///data/user/0/com.example.nutripal/cache/temp5153547958599274652.jpg"
  }
}

```
 - PUT
```json
{
  "name": "User Empat",
  "age": "24"
}
```
- Response
```json
{
  "message": "Profile updated successfully",
  "profile": {
    "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
    "name": "User Empat",
    "gender": "Pria",
    "age": "24",
    "weight": "62",
    "height": "175",
    "activityLevel": "Aktif",
    "profilePicture": "file:///data/user/0/com.example.nutripal/cache/temp5153547958599274652.jpg"
  }
}
```
# 2. Nutripal History API

 <h1>API Docs</h1>

![Run in Postman](https://run.pstmn.io/button.svg)

---

Base URL:

 <p >
  <a href="https://nutripal-history-1006183382175.us-central1.run.app/">Nutripal-History-API</a>
</p>

### History
- Endpoint
  - /api/nutrition
  -/api/nutrition/(UID)
- Method
  - POST
  - GET
- Request Body
  - uid: String
  - id: String
  - carbohydrate: Number
  - fat: Number
  - protein: Number
  - image_url: String
  - recommendation: String
  - timestamp: String
- Contoh Request dalam RAW
   - POST
```json
{
  "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
  "carbohydrate": 50,
  "fat": 20,
  "protein": 30,
  "image_url": "https://example.com/image.jpg",
  "recommendation": "Rekomendasi: Konsumsi lebih banyak protein"
}
```
- Response
```json
{
  "message": "Data berhasil disimpan",
  "id": "b1a7a4d7-c9fd-47e2-8bfb-37282b9d0a36"
}

```
- Response body jika uid tidak diberikan:
```json
{
  "message": "UID is required"
}
```
- Response body jika user tidak ditemukan di Firebase Authentication
 ```json
{
  "message": "User not found in Firebase Authentication"
}
```
- Response body jika terjadi kesalahan lain
```json
{
  "error": "Deskripsi error"
}

```
 - GET
```json
[
  {
    "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
    "id": "b1a7a4d7-c9fd-47e2-8bfb-37282b9d0a36",
    "carbohydrate23": 50,
    "fat729": 20,
    "protein569": 30,
    "image_url": "https://example.com/image.jpg",
    "recommendation": "Rekomendasi: Konsumsi lebih banyak protein",
    "timestamp": "2024-12-13T12:00:00.000Z"
  },
  {
    "uid": "11nSlGyCKOauvF8dX7vTRqxqF4Y2",
    "id": "e7b9a1f1-fb57-4852-814c-9f89dcb1e123",
    "carbohydrate23": 70,
    "fat729": 25,
    "protein569": 35,
    "image_url": "https://example.com/another_image.jpg",
    "recommendation": "Rekomendasi: Kurangi konsumsi lemak",
    "timestamp": "2024-12-14T09:30:00.000Z"
  }
]

```
# 3. VertexAI API

 <h1>API Docs</h1>

![Run in Postman](https://run.pstmn.io/button.svg)

---

Base URL:

 <p >
  <a href="https://vertex-api-1006183382175.us-central1.run.app/">Nutripal-VertexAI-API</a>
</p>

### History
- Endpoint
  - /api/generate
- Method
  - POST
- Request Body
  - dietPlan: String
  - weight: Number
  - height: Number
  - sex: String
  - age: Number
  - activityLevel: String
  - foodDetails: String
- Contoh Request dalam RAW
   - POST
```json
{
  "dietPlan": "weightloss",
  "weight": 60,
  "height": 180,
  "sex": "Male",
  "age": 18,
  "activityLevel": "Moderately Active",
  "foodDetails": "1 serving contains 20g carbs, 60g protein, 10g fat"
}
```
- Response
```json
{
  "message": "Content generated successfully",
  "data": "BMR adalah 1800 kkal, kalori harian 2400 kkal, makanan ini memiliki 500 kkal, maksimal 4 porsi, konsumsi secukupnya."
}
```
