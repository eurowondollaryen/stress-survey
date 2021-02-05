const users = [
  { email: 'kim@test.com', password: '123', name: 'Kim' },
  { email: 'lee@test.com', password: '456', name: 'Lee' },
  { email: 'park@test.com', password: '789', name: 'Park' },
];

export default function signIn({ email, password }) {
  const userr = users.find(
    user => user.email === email && user.password === password,
  );
  if (userr === undefined) throw new Error();
  return userr;
}
