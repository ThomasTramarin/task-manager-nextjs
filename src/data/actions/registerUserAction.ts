"use server";

export async function registerUserAction(prevState: any, formData: FormData) {
  //Form Fields
  const fields = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    repeatPassword: formData.get("repeatPassword"),
  };

  try {
    //Try request
    const res = await fetch(`${process.env.ROOT_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const data = await res.json();

    //If there are validate errors
    if (!res.ok) {
      return {
        ...prevState,
        success: false,
        errors: data.errors,
      };
    }

    //If there are no valitate errors
    return {
      ...prevState,
      success: true,
      errors: null,
    };

  } catch (err) {
    //If there are server error
    return {
      ...prevState,
      success: false,
      errors: [{ errorFor: "server", error: "An error occurred" }],
    };
  }
}
