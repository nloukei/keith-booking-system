import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Guest Registration - Kei Luxe Hotel" />

            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-white tracking-tight">Create Account</h2>
                <p className="text-sm text-slate-400 mt-1">Join Kei Luxe Hotel & Resort to unlock effortless reservations</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Full Name
                    </label>

                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 transition-colors placeholder:text-slate-500"
                        placeholder="John Doe"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-1 text-rose-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Email Address
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 transition-colors placeholder:text-slate-500"
                        placeholder="guest@example.com"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-1 text-rose-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 transition-colors placeholder:text-slate-500"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-1 text-rose-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Confirm Password
                    </label>

                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="w-full bg-slate-900/80 border border-slate-700 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-white rounded-xl text-sm px-4 py-3 transition-colors placeholder:text-slate-500"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1 text-rose-400 text-xs"
                    />
                </div>

                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
                    >
                        {processing ? 'Creating Account...' : 'Complete Registration'}
                    </button>
                </div>

                <div className="text-center pt-4 border-t border-slate-700/60">
                    <span className="text-xs text-slate-400">Already registered? </span>
                    <Link
                        href={route('login')}
                        className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                    >
                        Sign In to Account
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}

