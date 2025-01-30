// Initialize Supabase client
const supabaseUrl = 'https://ynrkeejeutvplvpfqziu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlucmtlZWpldXR2cGx2cGZxeml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjg0NTgsImV4cCI6MjA1Mzg0NDQ1OH0.kEXbqdWDswi_MXDSnT2Vy34wTrHM7uI9hTfTicM0lIs';

// Create Supabase client
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Test the connection
export async function testConnection() {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .select('*')
            .limit(1);
            
        if (error) throw error;
        console.log('Successfully connected to Supabase!');
        return true;
    } catch (error) {
        console.error('Error connecting to Supabase:', error.message);
        return false;
    }
}

// Handle contact form submissions
export async function handleContactForm(formData) {
    try {
        const { data, error } = await supabase
            .from('contacts')
            .insert([
                {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message'),
                    created_at: new Date().toISOString()
                }
            ]);

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error };
    }
}

// Handle file uploads
export async function handleFileUpload(file) {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error } = await supabase.storage
            .from('files')
            .upload(filePath, file);

        if (error) throw error;

        const { publicURL } = supabase.storage
            .from('files')
            .getPublicUrl(filePath);

        return { success: true, url: publicURL };
    } catch (error) {
        console.error('Error uploading file:', error);
        return { success: false, error };
    }
}

// Handle user authentication
export async function handleSignup(email, password) {
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) throw error;
        return { success: true, user };
    } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, error };
    }
}

// Initialize connection test
testConnection(); 