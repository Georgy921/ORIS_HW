using System;
using System.Collections.Generic;
using System.Linq;

namespace PatternsDemo;

class Program
{
    static void Main()
    {
        FactoryMethodDemo.Run();
        AbstractFactoryDemo.Run();
        BuilderDemo.Run();
        PrototypeDemo.Run();
        SingletonDemo.Run();

        AdapterDemo.Run();
        FacadeDemo.Run();
        DecoratorDemo.Run();
        CompositeDemo.Run();
        ProxyDemo.Run();

        StrategyDemo.Run();
        ObserverDemo.Run();
        CommandDemo.Run();
        StateDemo.Run();
    }
}

#region 1. Factory Method
interface ITransport { string Deliver(); }

class Truck : ITransport { public string Deliver() => "Доставка грузовиком"; }
class Ship : ITransport { public string Deliver() => "Доставка кораблём"; }

abstract class Logistics
{
    public abstract ITransport CreateTransport();
    public void PlanDelivery() => Console.WriteLine(CreateTransport().Deliver());
}

class RoadLogistics : Logistics
{
    public override ITransport CreateTransport() => new Truck();
}

class SeaLogistics : Logistics
{
    public override ITransport CreateTransport() => new Ship();
}

static class FactoryMethodDemo
{
    public static void Run()
    {
        Console.WriteLine("\nFactory Method");
        Logistics road = new RoadLogistics();
        Logistics sea = new SeaLogistics();
        road.PlanDelivery();
        sea.PlanDelivery();
    }
}
#endregion

#region 2. Abstract Factory
interface IButton { string Paint(); }
interface ICheckbox { string Paint(); }

class WinButton : IButton { public string Paint() => "Windows Button"; }
class WinCheckbox : ICheckbox { public string Paint() => "Windows Checkbox"; }

class MacButton : IButton { public string Paint() => "Mac Button"; }
class MacCheckbox : ICheckbox { public string Paint() => "Mac Checkbox"; }

interface IGuiFactory
{
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

class WinFactory : IGuiFactory
{
    public IButton CreateButton() => new WinButton();
    public ICheckbox CreateCheckbox() => new WinCheckbox();
}

class MacFactory : IGuiFactory
{
    public IButton CreateButton() => new MacButton();
    public ICheckbox CreateCheckbox() => new MacCheckbox();
}

static class AbstractFactoryDemo
{
    public static void Run()
    {
        Console.WriteLine("\nAbstract Factory");
        IGuiFactory factory = new WinFactory();
        Console.WriteLine(factory.CreateButton().Paint());
        Console.WriteLine(factory.CreateCheckbox().Paint());
    }
}
#endregion

#region 3. Builder
class House
{
    public int Floors;
    public bool Garage;
    public bool Pool;
    public override string ToString() => $"Этажей: {Floors}, гараж: {Garage}, бассейн: {Pool}";
}

class HouseBuilder
{
    private readonly House _house = new();

    public HouseBuilder SetFloors(int floors) { _house.Floors = floors; return this; }
    public HouseBuilder AddGarage() { _house.Garage = true; return this; }
    public HouseBuilder AddPool() { _house.Pool = true; return this; }
    public House Build() => _house;
}

static class BuilderDemo
{
    public static void Run()
    {
        Console.WriteLine("\nBuilder");
        var house = new HouseBuilder()
            .SetFloors(2)
            .AddGarage()
            .Build();

        Console.WriteLine(house);
    }
}
#endregion

#region 4. Prototype
class Person : ICloneable
{
    public string Name = "";
    public int Age;

    public object Clone() => new Person { Name = Name, Age = Age };
}

static class PrototypeDemo
{
    public static void Run()
    {
        Console.WriteLine("\nPrototype");
        var p1 = new Person { Name = "Иван", Age = 20 };
        var p2 = (Person)p1.Clone();
        p2.Name = "Пётр";

        Console.WriteLine($"{p1.Name}, {p1.Age}");
        Console.WriteLine($"{p2.Name}, {p2.Age}");
    }
}
#endregion

#region 5. Singleton
class Singleton
{
    private static readonly Singleton _instance = new();
    public static Singleton Instance => _instance;
    public string Value = "Один объект";
    private Singleton() { }
}
static class SingletonDemo
{
    public static void Run()
    {
        Console.WriteLine("\nSingleton");
        var a = Singleton.Instance;
        var b = Singleton.Instance;
        Console.WriteLine(ReferenceEquals(a, b));
    }
}
#endregion

#region 6. Adapter
class OldPrinter
{
    public void OldPrint() => Console.WriteLine("Печать через старый принтер");
}

interface IPrinter
{
    void Print();
}

class PrinterAdapter : IPrinter
{
    private readonly OldPrinter _oldPrinter;
    public PrinterAdapter(OldPrinter oldPrinter) => _oldPrinter = oldPrinter;
    public void Print() => _oldPrinter.OldPrint();
}

static class AdapterDemo
{
    public static void Run()
    {
        Console.WriteLine("\nAdapter");
        IPrinter printer = new PrinterAdapter(new OldPrinter());
        printer.Print();
    }
}
#endregion

#region 7. Facade
class CPU { public void Start() => Console.WriteLine("CPU start"); }
class Memory { public void Load() => Console.WriteLine("Memory load"); }
class Disk { public void Read() => Console.WriteLine("Disk read"); }

class ComputerFacade
{
    private readonly CPU _cpu = new();
    private readonly Memory _memory = new();
    private readonly Disk _disk = new();

    public void Start()
    {
        _cpu.Start();
        _memory.Load();
        _disk.Read();
    }
}

static class FacadeDemo
{
    public static void Run()
    {
        Console.WriteLine("\nFacade");
        new ComputerFacade().Start();
    }
}
#endregion

#region 8. Decorator
interface ICoffee
{
    string GetName();
    int GetCost();
}

class SimpleCoffee : ICoffee
{
    public string GetName() => "Кофе";
    public int GetCost() => 100;
}

class MilkDecorator : ICoffee
{
    private readonly ICoffee _coffee;
    public MilkDecorator(ICoffee coffee) => _coffee = coffee;
    public string GetName() => _coffee.GetName() + " + молоко";
    public int GetCost() => _coffee.GetCost() + 20;
}

static class DecoratorDemo
{
    public static void Run()
    {
        Console.WriteLine("\nDecorator");
        ICoffee coffee = new MilkDecorator(new SimpleCoffee());
        Console.WriteLine($"{coffee.GetName()} = {coffee.GetCost()}");
    }
}
#endregion

#region 9. Composite
interface IFileSystemItem
{
    void Show();
}

class FileItem : IFileSystemItem
{
    private readonly string _name;
    public FileItem(string name) => _name = name;
    public void Show() => Console.WriteLine($"Файл: {_name}");
}

class Folder : IFileSystemItem
{
    private readonly string _name;
    private readonly List<IFileSystemItem> _items = new();

    public Folder(string name) => _name = name;
    public void Add(IFileSystemItem item) => _items.Add(item);

    public void Show()
    {
        Console.WriteLine($"Папка: {_name}");
        foreach (var item in _items) item.Show();
    }
}

static class CompositeDemo
{
    public static void Run()
    {
        Console.WriteLine("\nComposite");
        var folder = new Folder("Docs");
        folder.Add(new FileItem("a.txt"));
        folder.Add(new FileItem("b.txt"));
        folder.Show();
    }
}
#endregion

#region 10. Proxy
interface IImage
{
    void Display();
}

class RealImage : IImage
{
    private readonly string _file;
    public RealImage(string file)
    {
        _file = file;
        Console.WriteLine("Загрузка изображения...");
    }

    public void Display() => Console.WriteLine($"Показ {_file}");
}

class ImageProxy : IImage
{
    private readonly string _file;
    private RealImage? _realImage;

    public ImageProxy(string file) => _file = file;

    public void Display()
    {
        _realImage ??= new RealImage(_file);
        _realImage.Display();
    }
}

static class ProxyDemo
{
    public static void Run()
    {
        Console.WriteLine("\nProxy");
        IImage image = new ImageProxy("photo.png");
        image.Display();
        image.Display();
    }
}
#endregion

#region 11. Strategy
interface IPaymentStrategy
{
    void Pay(int amount);
}

class CardPayment : IPaymentStrategy
{
    public void Pay(int amount) => Console.WriteLine($"Оплата картой: {amount}");
}
class CashPayment : IPaymentStrategy
{
    public void Pay(int amount) => Console.WriteLine($"Оплата наличными: {amount}");
}

class PaymentContext
{
    private IPaymentStrategy _strategy;
    public PaymentContext(IPaymentStrategy strategy) => _strategy = strategy;
    public void SetStrategy(IPaymentStrategy strategy) => _strategy = strategy;
    public void Pay(int amount) => _strategy.Pay(amount);
}

static class StrategyDemo
{
    public static void Run()
    {
        Console.WriteLine("\nStrategy");
        var payment = new PaymentContext(new CardPayment());
        payment.Pay(1000);
        payment.SetStrategy(new CashPayment());
        payment.Pay(500);
    }
}
#endregion

#region 12. Observer
interface IObserver
{
    void Update(int temp);
}

class PhoneDisplay : IObserver
{
    public void Update(int temp) => Console.WriteLine($"Телефон: температура {temp}");
}

class WeatherStation
{
    private readonly List<IObserver> _observers = new();
    public void Subscribe(IObserver observer) => _observers.Add(observer);

    public void SetTemperature(int temp)
    {
        foreach (var observer in _observers)
            observer.Update(temp);
    }
}

static class ObserverDemo
{
    public static void Run()
    {
        Console.WriteLine("\nObserver");
        var station = new WeatherStation();
        station.Subscribe(new PhoneDisplay());
        station.SetTemperature(25);
    }
}
#endregion

#region 13. Command
interface ICommand
{
    void Execute();
}

class Light
{
    public void On() => Console.WriteLine("Свет включён");
    public void Off() => Console.WriteLine("Свет выключен");
}

class LightOnCommand : ICommand
{
    private readonly Light _light;
    public LightOnCommand(Light light) => _light = light;
    public void Execute() => _light.On();
}

class RemoteControl
{
    public void Submit(ICommand command) => command.Execute();
}

static class CommandDemo
{
    public static void Run()
    {
        Console.WriteLine("\nCommand");
        var light = new Light();
        var command = new LightOnCommand(light);
        new RemoteControl().Submit(command);
    }
}
#endregion

#region 14. State
interface IState
{
    void Handle(TrafficLight context);
}

class RedState : IState
{
    public void Handle(TrafficLight context)
    {
        Console.WriteLine("Красный -> Зелёный");
        context.State = new GreenState();
    }
}

class GreenState : IState
{
    public void Handle(TrafficLight context)
    {
        Console.WriteLine("Зелёный -> Красный");
        context.State = new RedState();
    }
}

class TrafficLight
{
    public IState State { get; set; } = new RedState();
    public void Next() => State.Handle(this);
}

static class StateDemo
{
    public static void Run()
    {
        Console.WriteLine("\nState");
        var light = new TrafficLight();
        light.Next();
        light.Next();
    }
}
#endregion